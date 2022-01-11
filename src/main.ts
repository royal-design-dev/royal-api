import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './common/filters/entity-not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, skipMissingProperties: false }),
  );

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Royal api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('/api/docs', app, swaggerDocument);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(5000);

  Logger.log(`Listening on http://localhost:5000`, 'Bootstrap');
}

bootstrap();
