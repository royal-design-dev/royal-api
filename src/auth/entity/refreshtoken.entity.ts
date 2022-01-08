import { UsersEntity } from 'src/users/entity/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  token: string;

  @Column('date')
  expiresIn: Date;

  @ManyToOne(() => UsersEntity, (user: UsersEntity) => user.refreshTokens, {
    onDelete: 'CASCADE',
  })
  user: UsersEntity;
}
