import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'shots' })
export class ShotEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  picture: string;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  subtitle: string;

  @Column({ type: 'varchar', length: 300 })
  shotUrl: string;
}
