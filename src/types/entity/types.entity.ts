import { ShotsEntity } from 'src/shots/entity/shots.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('types')
export class TypesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  slug: string;

  @OneToMany(() => ShotsEntity, (shot) => shot.type, {
    cascade: true,
  })
  shots: ShotsEntity[];
}
