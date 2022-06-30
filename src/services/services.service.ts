import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesRepository } from './services.repository';
import { ServicesCreateDto } from './types/dto/services-create.dto';

import { stringify } from 'qs';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServicesRepository)
    private readonly servicesRepository: ServicesRepository,
    private readonly configService: ConfigService,
  ) {}

  create = async (service: ServicesCreateDto) => {
    const client_id = this.configService.get('CLIENT_ID');
    const DRIBBBLE_REDIRECT_URL = this.configService.get(
      'DRIBBBLE_REDIRECT_URL',
    );

    const authLink = `https://dribbble.com/oauth/authorize?${stringify({
      client_id,
      redirect_uri: `${DRIBBBLE_REDIRECT_URL}${service.slug}`,
    })}&scope=public+write+upload`;

    const item = this.servicesRepository.create({ ...service, authLink });

    return await this.servicesRepository.save(item);
  };

  findAll = async () => await this.servicesRepository.findAllAndCount();

  findBySlug = async (slug: string) =>
    await this.servicesRepository.findOneOrFail({ slug });
}
