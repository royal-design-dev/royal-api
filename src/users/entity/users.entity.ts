import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { RefreshToken } from 'src/auth/entity/refreshtoken.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  login: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(
    () => RefreshToken,
    (refreshToken: RefreshToken) => refreshToken.user,
  )
  refreshTokens: RefreshToken[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  constructor(partial?: Partial<UsersEntity>) {
    Object.assign(this, partial);
  }
}
