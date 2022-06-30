import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { UsersRo } from 'src/users/types/ro/users.ro';
import { ShotsDto } from './shots.dto';

export class ShotsCreateDto extends OmitType(ShotsDto, ['id']) {}

export class ShotsCreateDtoProps extends ShotsCreateDto {
  @ApiProperty({ type: PickType(UsersRo, ['id']) })
  user: Pick<UsersRo, 'id'>;
}
