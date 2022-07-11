import {
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

import performLikeChecker from 'src/common/scripts/performLike';

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

    // TODO: ADD worker threads

    // await viewsWorker(myShot.html_url);

    const item = await this.shotsRepository.create({
      ...shot,
      picture: myShot.images.hidpi,
    } as ShotsCreateDtoProps);

    return await this.shotsRepository.save(item);
  };

  remove = async (id: string) => {
    const rows = await this.shotsRepository.delete({ id });

    if (rows.affected === 0)
      throw new NotFoundException(`Shot with id ${id} not found`);
  };

  perform = async (userId: string, shotId: string) => {
    const shot = await this.shotsRepository.findOneById(shotId);
    const user = await this.usersService.findAllInfo(userId);

    if (shot.user.id === userId)
      throw new ForbiddenException("You can't complete your tasks");

    const {
      shotUrl,
      service: { slug },
    } = shot;
    const { binds } = user;

    const currentBind = binds.find((bind) => bind.service.slug === slug);

    if (!currentBind)
      throw new ForbiddenException(
        "Unfortunately you don't have a link to the service",
      );

    // TODO: try catch

    const checkPerform = await performLikeChecker(
      shotUrl,
      currentBind.userServiceId,
    );

    return checkPerform;
  };

  // async change(id: string, updateShotDto: ShotsUpdateDto) {
  //   try {
  //     await this.shotsRepository.save({ id, ...updateShotDto });

  //     return await this.findById(id);
  //   } catch (error) {
  //     throw new NotFoundException(error);
  //   }
  // }
}
