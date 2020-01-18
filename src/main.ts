import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { ValidatorPipe } from './pipes/validator.pipe';
import * as express from 'express';
import { join } from 'path';
import { config } from 'dotenv';

async function bootstrap() {

    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
        cors: true,
    });
    app.enableCors();
    const options = new DocumentBuilder()
        .setTitle('general')
        .setDescription('The general API description')
        .setVersion('1.0')
        .addTag('general')
        .build();
    app.use(compression());

    const document = SwaggerModule.createDocument(app, options);
    app.use(express.static(join(__dirname, '../public/dist/')));
    app.use(express.static(join(__dirname, '../public/uploads/')));
    SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new ValidatorPipe());
    await app.listen(process.env.PORT);
    console.log(
        `listen in port http://${process.env.HOST}:${process.env.PORT}`,
    );
}
bootstrap();
