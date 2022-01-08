import { CategoryEntity } from 'src/categories/entity/categories.entity';
import { CategoriesCreateRo } from 'src/categories/types/ro/categories-create.ro';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('shots')
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

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoriesCreateRo[];
}
