import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { ValidatorPipe } from './pipes/validator.pipe';
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
    SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new ValidatorPipe());
    await app.listen(3000, '192.168.1.77');
    console.log('listen in port http://192.168.1.77:3000');
}
bootstrap();
