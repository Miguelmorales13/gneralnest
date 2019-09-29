import { HttpModule, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './core/auth/auth.module';
import { RolModule } from './core/rol/rol.module';
import { UserModule } from './core/user/user.module';
import { HttpErrorFilter } from './filters/http-error.filter';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { config } from 'dotenv';
import { HelpersModule } from './helpers/helpers.module';
import { ImagesModule } from './core/images/images/images.module';
import { CategoriesImagesModule } from './core/images/categories-images/categories-images.module';

/**
 * Module
 */
@Module({
    imports: [
        // Typeorm  config async
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (_config: ConfigService) =>
                ({
                    type: _config.get('TYPEORM_TYPE'),
                    host: _config.get('TYPEORM_HOST'),
                    port: _config.get('TYPEORM_PORT'),
                    username: _config.get('TYPEORM_USERNAME'),
                    password: _config.get('TYPEORM_PASSWORD'),
                    database: _config.get('TYPEORM_DATABASE'),
                    entities: [__dirname + '/entitys/*.entity{.ts,.js}'],
                    synchronize: _config.get('TYPEORM_SYNCRHONIZE'),
                    logging: ['error'],
                    logger: 'file' // logger to error  database,
                } as TypeOrmModuleOptions),
            inject: [ConfigService],
        }),
        // multer config async for upload files
        MulterModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (_config: ConfigService) => ({
                dest: path.join(__dirname, _config.get('MULTER_DEST')),
            }),
            inject: [ConfigService],
        }),
        // http config  async is for petitions type ajax
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (_config: ConfigService) => ({
                timeout: _config.get('HTTP_TIMEOUT'),
                maxRedirects: _config.get('HTTP_MAX_REDIRECTS'),
            }),
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
        RolModule,
        ConfigModule,
        HelpersModule,
        ImagesModule,
        CategoriesImagesModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggerInterceptor,
        },
    ],
})
export class AppModule {
    constructor(){
        config()
    }
}
