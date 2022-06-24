import { ShotEntity } from 'src/shots/entity/shots.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('services')
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  slug: string;

  @OneToMany(() => ShotEntity, (shot) => shot.service, {
    cascade: true,
  })
  shots: ShotEntity[];
}
