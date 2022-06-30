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
    const authLink = this.getAuthLinkByService(service.slug);

    const item = this.servicesRepository.create({ ...service, authLink });

    return await this.servicesRepository.save(item);
  };

  findAll = async () => await this.servicesRepository.findAll();

  findBySlug = async (slug: string) =>
    await this.servicesRepository.findOneOrFail({ slug });

  getAuthLinkByService = (serviceSlug: string) => {
    const DRIBBBLE_CLIENT_ID = this.configService.get('DRIBBBLE_CLIENT_ID');
    const DRIBBBLE_REDIRECT_URL = this.configService.get(
      'DRIBBBLE_REDIRECT_URL',
    );

    const FIGMA_CLIENT_ID = this.configService.get('FIGMA_CLIENT_ID');
    const FIGMA_REDIRECT_URL = this.configService.get('FIGMA_REDIRECT_URL');

    switch (serviceSlug) {
      case 'figma':
        return `https://www.figma.com/oauth?${stringify({
          client_id: FIGMA_CLIENT_ID,
          redirect_uri: `${FIGMA_REDIRECT_URL}${serviceSlug}`,
        })}&scope=file_read`;

      case 'dribbble':
        return `https://dribbble.com/oauth/authorize?${stringify({
          client_id: DRIBBBLE_CLIENT_ID,
          redirect_uri: `${DRIBBBLE_REDIRECT_URL}${serviceSlug}`,
        })}&scope=public+write+upload`;

      default:
        return `https://dribbble.com/oauth/authorize?${stringify({
          client_id: DRIBBBLE_CLIENT_ID,
          redirect_uri: `${DRIBBBLE_REDIRECT_URL}${serviceSlug}`,
        })}&scope=public+write+upload`;
    }
  };
}
