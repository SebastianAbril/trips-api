import { NestFactory } from '@nestjs/core';
import { AppModule } from './main/module/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Trips API')
    .setDescription(
      'Amazing API where you can request a trip wherever you are!',
    )
    .setVersion('1.0')
    .addTag('Trips,API,rides')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
