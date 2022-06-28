import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { BindsEntity } from 'src/binds/entity/binds.entity';
import { ShotsEntity } from 'src/shots/entity/shots.entity';

export class UsersRo implements Readonly<UsersRo> {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  picture: string;

  @ApiProperty({ type: ShotsEntity, isArray: true })
  shots: ShotsEntity[];

  @ApiProperty({ type: BindsEntity, isArray: true })
  binds: BindsEntity[];
}
