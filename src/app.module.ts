import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShotsModule } from './artciles/shots.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', cache: true }),
    DbModule,
    ShotsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
