import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShotsModule } from './shots/shots.module';
import { DbModule } from './db/db.module';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypesModule } from './types/types.module';
import { BindsModule } from './binds/binds.module';
import { DribbbleModule } from './binds/modules/dribbble/dribbble.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', cache: true }),
    DbModule,
    TypesModule,
    ShotsModule,
    BindsModule,
    DribbbleModule,
    ShotsModule,
    ServicesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
