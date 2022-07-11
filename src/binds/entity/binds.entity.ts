import { ApiProperty } from '@nestjs/swagger';
import { ServicesEntity } from 'src/services/entity/services.entity';
import { UsersEntity } from 'src/users/entity/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('binds')
export class BindsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  token: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 300, default: '' })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 300, default: '' })
  picture: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 300, default: '' })
  userServiceId: string;

  @ManyToOne(() => UsersEntity, (user) => user.binds)
  user: UsersEntity;

  @ManyToOne(() => ServicesEntity, (service) => service.binds)
  service: ServicesEntity;
}
