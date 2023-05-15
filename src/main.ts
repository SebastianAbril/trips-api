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
      'Trips API is an exceptional project developed with NestJS, TypeScript, PostgreSQL, Docker, GitHubActions and AWS. As a Rider you can request a Ride everywhere, and the API will contact the nearest driver to assist you in your trip. Before requesting a Ride, be sure to have a payment source first.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
