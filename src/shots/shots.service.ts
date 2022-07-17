import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BindsService } from 'src/binds/binds.service';
import { DribbbleService } from 'src/binds/dribbble.service';
import { ServicesService } from 'src/services/services.service';
import { TypesService } from 'src/types/types.service';
import { UsersService } from 'src/users/users.service';
import { ShotsRepository } from './shots.repository';
import { ShotsCreateDtoProps } from './types/dto/shots-create.dto';
import { ShotsFilterDto } from './types/dto/shots.dto';
import { ShotsStatusEnum } from './types/enums/shots';

import {
  performDrbLikeChecker,
  performDrbCommentChecker,
} from 'src/common/scripts';
import viewsWorker from 'src/common/scripts/views';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ShotsService {
  constructor(
    @InjectRepository(ShotsRepository)
    private readonly shotsRepository: ShotsRepository,
    private readonly bindsService: BindsService,
    private readonly dribbbleService: DribbbleService,
    private readonly typesService: TypesService,
    private readonly servicesService: ServicesService,
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
  ) {}

  findAndCount = async (filter: ShotsFilterDto) => {
    return this.shotsRepository.findAllAndCount(filter);
  };

  findById = async (id: string) => {
    return this.shotsRepository.findOneById(id);
  };

  create = async (shot: ShotsCreateDtoProps) => {
    const {
      user: { id: userId },
      service: { id: serviceId },
      type: { id: typeId },
      price,
      count,
    } = shot;
    const findBind = await this.bindsService.checkPreBind(userId, serviceId);

    if (!findBind)
      throw new NotFoundException('You account not bind from this service');

    const findService = await this.servicesService.findById(serviceId);

    if (!findService) throw new NotFoundException('Service not found');

    const findType = await this.typesService.findById(typeId);

    if (!findType) throw new NotFoundException('Type not found');

    // TODO: trycatch
    const myShot = await this.dribbbleService.getMyShotByUrl(
      shot.shotUrl,
      findBind.token,
    );

    const { balance } = await this.usersService.findAllInfo(userId);

    const priceTask = price * count;

    if (balance < priceTask) throw new ConflictException('Insufficient funds');

    await this.usersService.change(userId, {
      balance: balance - priceTask,
    });

    await viewsWorker(myShot.html_url, count, this.httpService);

    const item = await this.shotsRepository.create({
      ...shot,
      picture: myShot.images.hidpi,
    } as ShotsCreateDtoProps);

    return await this.shotsRepository.save(item);
  };

  remove = async (userId: string, shotId: string) => {
    const shot = await this.findById(shotId);

    const { count, executions, price } = shot;

    const returnPrice = (count - executions) * price;

    await this.usersService.change(userId, { balance: returnPrice });

    const rows = await this.shotsRepository.delete({ id: shotId });

    if (rows.affected === 0)
      throw new NotFoundException(`Shot with id ${shotId} not found`);

    return true;
  };

  perform = async (userId: string, shotId: string) => {
    const shot = await this.findById(shotId);
    const user = await this.usersService.findAllInfo(userId);

    if (shot.user.id === userId)
      throw new ForbiddenException("You can't complete your tasks");

    const {
      count,
      status,
      shotUrl,
      service: { slug: serviceSlug },
      performeds,
      type: { slug: typeSlug },
    } = shot;
    const { binds } = user;

    if (status === ShotsStatusEnum.COMPLETE) {
      throw new ForbiddenException('This task is no longer available');
    }

    const currentBind = binds.find((bind) => bind.service.slug === serviceSlug);

    if (!currentBind)
      throw new ForbiddenException(
        "Unfortunately you don't have a link to the service",
      );

    const currentPerformed = performeds.find((perf) => perf.id === userId);

    if (currentPerformed)
      throw new ForbiddenException('You have already completed this task');

    const check = {
      url: shotUrl,
      checkId: currentBind.userServiceId,
    };

    const checkPerform =
      serviceSlug === 'dribbble'
        ? typeSlug === 'likes'
          ? await performDrbLikeChecker(check)
          : typeSlug === 'comments'
          ? await performDrbCommentChecker(check)
          : typeSlug === 'views'
        : false;

    if (!checkPerform)
      throw new ForbiddenException('The task could not be verified!');

    shot.executions += 1;
    shot.performeds.push(user);

    if (count === shot.executions) shot.status = ShotsStatusEnum.COMPLETE;

    await this.shotsRepository.save(shot);

    await this.usersService.change(userId, {
      balance: user.balance + shot.price,
    });

    return checkPerform;
  };
}
