import { Module } from '@nestjs/common';
import { CategoriesImagesEntity } from '../../../entitys/GategoriesImages.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesImagesService } from './categories-images.service';
import { CategoriesController } from './categories-images.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CategoriesImagesEntity])],
    providers: [CategoriesImagesService],
    controllers: [CategoriesController],
    exports: [CategoriesImagesService],
})
export class CategoriesImagesModule {}
