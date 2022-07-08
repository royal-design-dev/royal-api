import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { Role } from 'src/auth/roles/role.enum';
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
  @IsNumber()
  balance: number;

  @ApiProperty({
    description: 'Role',
    enum: Role,
    nullable: true,
    required: false,
    default: Role.None,
  })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ type: ShotsEntity, isArray: true })
  shots: ShotsEntity[];

  @ApiProperty({ type: BindsEntity, isArray: true })
  binds: BindsEntity[];
}
