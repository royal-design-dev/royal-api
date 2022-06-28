import { BindsEntity } from 'src/binds/entity/binds.entity';
import { ShotsEntity } from 'src/shots/entity/shots.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ServicesStatusEnum } from '../types/enums/shots';

@Entity('services')
export class ServicesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  slug: string;

  @Column({
    type: 'enum',
    enum: ServicesStatusEnum,
    default: ServicesStatusEnum.ACTIVE,
  })
  status: ServicesStatusEnum;

  @OneToMany(() => ShotsEntity, (shot) => shot.service, {
    cascade: true,
  })
  shots: ShotsEntity[];

  @OneToMany(() => BindsEntity, (bind) => bind.service, {
    cascade: true,
  })
  binds: BindsEntity[];
}
