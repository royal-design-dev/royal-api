import { ServiceEntity } from 'src/services/entity/services.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShotsTypeEnum } from '../types/enums/shots';

@Entity('shots')
export class ShotEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  shotUrl: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'varchar', length: 300 })
  picture: string;

  @Column({ type: 'integer', nullable: false, default: 0 })
  price: number;

  @Column({
    type: 'enum',
    enum: ShotsTypeEnum,
    default: ShotsTypeEnum.COMPLETE,
  })
  type: ShotsTypeEnum;

  @ManyToOne(() => ServiceEntity, (service) => service.shots)
  service: ServiceEntity;
}
