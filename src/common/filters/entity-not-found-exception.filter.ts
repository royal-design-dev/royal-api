import { Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';

import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

/**
 * Custom exception filter to convert EntityNotFoundError from TypeOrm to NestJs NotFoundException
 */
@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  public catch(exception: EntityNotFoundError) {
    throw new NotFoundException(exception.message);
  }
}
