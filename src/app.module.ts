import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShotsModule } from './shots/shots.module';
import { DbModule } from './db/db.module';
import { CategoriesModule } from './categories/categories.module';
import { DribbbleModule } from './dribbble/dribbble.module';
import { UploadsModule } from './uploads/uploads.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', cache: true }),
    DbModule,
    ShotsModule,
    CategoriesModule,
    DribbbleModule,
    UploadsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
