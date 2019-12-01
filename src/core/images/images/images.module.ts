import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Image } from './Image.entity';
import { HelpersModule } from '../../../helpers/helpers.module';
import { ImagesService } from './images.service';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    imports: [
        MongooseModule.forFeature([{name:'Images',schema:Image}]),
        HelpersModule,
    ],
    providers: [ ImagesService],
    controllers: [ImagesController],
    exports: [ ImagesService],
})
export class ImagesModule {}
