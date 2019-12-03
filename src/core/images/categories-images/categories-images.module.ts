import { Module } from '@nestjs/common';
import {  CategoriesImages } from './CategoriesImages.entity';
import { CategoriesImagesService } from './categories-images.service';
import { CategoriesController } from './categories-images.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{name:'CategoriesImages',schema:CategoriesImages}])],
    providers: [CategoriesImagesService],
    controllers: [CategoriesController],
    exports: [CategoriesImagesService],
})
export class CategoriesImagesModule {}
