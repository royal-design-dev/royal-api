import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BindsService } from 'src/binds/binds.service';
import { DribbbleService } from 'src/binds/dribbble.service';
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
    } = shot;
    const findBind = await this.bindsService.checkPreBind(userId, serviceId);

    if (!findBind)
      throw new NotFoundException('You account not bind from this service');

    // TODO: trycatch
    const mySHot = await this.dribbbleService.getMyShotByUrl(
      shot.shotUrl,
      findBind.token,
    );

    // TODO: add views bot

    const item = await this.shotsRepository.create({
      ...shot,
      picture: mySHot.images.hidpi,
    } as ShotsCreateDtoProps);

    return await this.shotsRepository.save(item);
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
