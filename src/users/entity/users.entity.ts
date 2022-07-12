import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { hash, compare } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { RefreshToken } from 'src/auth/entity/refreshtoken.entity';
import { ShotsEntity } from 'src/shots/entity/shots.entity';
import { BindsEntity } from 'src/binds/entity/binds.entity';
import { Role } from 'src/auth/roles/role.enum';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'integer', nullable: false, default: 0 })
  balance: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.None,
  })
  role: Role;

  @OneToMany(
    () => RefreshToken,
    (refreshToken: RefreshToken) => refreshToken.user,
    {
      cascade: true,
    },
  )
  refreshTokens: RefreshToken[];

  @OneToMany(() => ShotsEntity, (shot) => shot.user, {
    cascade: true,
  })
  shots: ShotsEntity[];

  @OneToMany(() => BindsEntity, (bind) => bind.user, {
    cascade: true,
  })
  binds: BindsEntity[];

  @ManyToMany(() => ShotsEntity, (shot) => shot.performeds, {
    cascade: true,
  })
  performeds: ShotsEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 12);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await compare(attempt, this.password);
  }

  constructor(partial?: Partial<UsersEntity>) {
    Object.assign(this, partial);
  }
}
