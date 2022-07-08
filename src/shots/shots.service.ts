import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BindsService } from 'src/binds/binds.service';
import { DribbbleService } from 'src/binds/dribbble.service';
import viewsWorker from 'src/scripts/views';
import { ServicesService } from 'src/services/services.service';
import { TypesService } from 'src/types/types.service';
import { ShotsRepository } from './shots.repository';
import { ShotsCreateDtoProps } from './types/dto/shots-create.dto';
import { ShotsFilterDto } from './types/dto/shots.dto';

@Injectable()
export class ShotsService {
  constructor(
    @InjectRepository(ShotsRepository)
    private readonly shotsRepository: ShotsRepository,
    private readonly bindsService: BindsService,
    private readonly dribbbleService: DribbbleService,
    private readonly typesService: TypesService,
    private readonly servicesService: ServicesService,
  ) {}

  async findAndCount(filter: ShotsFilterDto) {
    return this.shotsRepository.findAllAndCount(filter);
  }

  async findById(id: string) {
    return this.shotsRepository.findOneById(id);
  }

  async create(shot: ShotsCreateDtoProps) {
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

    // console.log(myShot, findType);

    await viewsWorker(myShot.html_url);

    // TODO: add views bot

    // const item = await this.shotsRepository.create({
    //   ...shot,
    //   picture: mySHot.images.hidpi,
    // } as ShotsCreateDtoProps);

    // return await this.shotsRepository.save(item);
  }

  async remove(id: string) {
    const rows = await this.shotsRepository.delete({ id });

    if (rows.affected === 0)
      throw new NotFoundException(`Shot with id ${id} not found`);
  }

  // async change(id: string, updateShotDto: ShotsUpdateDto) {
  //   try {
  //     await this.shotsRepository.save({ id, ...updateShotDto });

  //     return await this.findById(id);
  //   } catch (error) {
  //     throw new NotFoundException(error);
  //   }
  // }
}
