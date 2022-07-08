import { OmitType, PartialType } from '@nestjs/swagger';
import { UsersDto } from './users.dto';

export class UsersUpdateDto extends PartialType(OmitType(UsersDto, ['id'])) {}
