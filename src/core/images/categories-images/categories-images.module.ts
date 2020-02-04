import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesImagesEntity } from '../../../entitys/GategoriesImages.entity';
import { CategoriesController } from './categories-images.controller';
import { CategoriesImagesService } from './categories-images.service';

@Module({
	imports: [TypeOrmModule.forFeature([CategoriesImagesEntity])],
	providers: [CategoriesImagesService],
	controllers: [CategoriesController],
	exports: [CategoriesImagesService],
})
export class CategoriesImagesModule { }
