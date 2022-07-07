import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { hash, compare } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { RefreshToken } from 'src/auth/entity/refreshtoken.entity';
import { ShotsEntity } from 'src/shots/entity/shots.entity';
import { BindsEntity } from 'src/binds/entity/binds.entity';

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
