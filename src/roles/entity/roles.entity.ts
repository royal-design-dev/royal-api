import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../enum/roles.enum';

@Entity('roles')
export class RolesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.None,
  })
  name: Roles;

  @Column({ type: 'varchar', length: 300 })
  value: string;
}
