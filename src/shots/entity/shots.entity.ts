import { CategoryEntity } from 'src/categories/entity/categories.entity';
import { CategoriesCreateRo } from 'src/categories/types/ro/categories-create.ro';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @Column({
    type: 'enum',
    enum: ShotsTypeEnum,
    default: ShotsTypeEnum.COMPLETE,
  })
  type: ShotsTypeEnum;

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoriesCreateRo[];
}
