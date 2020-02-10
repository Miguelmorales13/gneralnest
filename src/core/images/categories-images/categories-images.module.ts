import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryImages } from '../../../entitys/GategoriesImages.entity';
import { CategoriesController } from './categories-images.controller';
import { CategoriesImagesService } from './categories-images.service';
import { DatabaseModule } from '../../../providers/database.module';
import { categoryImagesProviders } from './category-image.provider';

@Module({
	imports: [DatabaseModule,],
	providers: [CategoriesImagesService, ...categoryImagesProviders],
	controllers: [CategoriesController],
	exports: [CategoriesImagesService],
})
export class CategoriesImagesModule { }
