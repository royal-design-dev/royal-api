import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShotsModule } from './shots/shots.module';
import { DbModule } from './db/db.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', cache: true }),
    DbModule,
    ShotsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
