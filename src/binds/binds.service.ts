import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesService } from 'src/services/services.service';
import { BindsRepository } from './binds.repository';
import { DribbbleService } from './dribbble.service';
import { BindsServiceCreateDto } from './types/dto/binds-service-create.dto';

@Injectable()
export class BindsService {
  constructor(
    @InjectRepository(BindsRepository)
    private readonly bindsRepository: BindsRepository,
    private readonly servicesService: ServicesService,
    private readonly dribbbleService: DribbbleService,
  ) {}

  checkPreBind = async (userId: string, serviceId: string) =>
    await this.bindsRepository.findOne({
      user: { id: userId },
      service: { id: serviceId },
    });

  findAuthLink = async (userId: string, serviceSlug: string) => {
    const service = await this.servicesService.findBySlug(serviceSlug);

    if (!service) throw new NotFoundException('Service not found');

    const preBind = await this.checkPreBind(userId, service.id);

    if (preBind)
      throw new NotFoundException('There is already a bundle with the service');

    return service.authLink;
  };

  getTokenAndCreateBind = async (
    body: BindsServiceCreateDto,
    userId: string,
  ) => {
    const { service, code } = body;

    const { id: serviceId } = await this.servicesService.findBySlug(service);

    const preBind = await this.checkPreBind(userId, serviceId);

    if (preBind)
      throw new NotFoundException('There is already a bundle with the service');

    // TODO: tryCatch
    const bind = await this.dribbbleAction(userId, code, service, serviceId);

    const item = await this.bindsRepository.create(bind);

    await this.bindsRepository.save(item);

    return await this.bindsRepository
      .createQueryBuilder('binds')
      .leftJoinAndSelect('binds.service', 'service')
      .leftJoinAndSelect('binds.user', 'user')
      .select([
        'binds.id',
        'binds.name',
        'binds.picture',
        'binds.userServiceId',
        'service.id',
        'service.name',
        'service.slug',
      ])
      .where({ user: { id: userId, service: { id: serviceId } } })
      .getMany();
  };

  findAllByUser = async (userId: string) =>
    await this.bindsRepository.getAllByUser(userId);

  dribbbleAction = async (userId, code, service, serviceId) => {
    const { access_token } = await this.dribbbleService.getToken(code, service);

    if (!access_token) throw new NotFoundException("Сouldn't get a token");

    const bind = await this.dribbbleService.getDtoObject(
      userId,
      access_token,
      serviceId,
    );

    if (!bind) throw new NotFoundException("Couldn't form a binding");

    return bind;
  };
}
