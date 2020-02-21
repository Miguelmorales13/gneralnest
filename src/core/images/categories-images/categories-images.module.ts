import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../providers/database.module';
import { CategoriesController } from './categories-images.controller';
import { CategoriesImagesService } from './categories-images.service';
import { categoryImagesProviders } from './category-image.provider';

@Module({
	imports: [DatabaseModule,],
	providers: [CategoriesImagesService, ...categoryImagesProviders],
	controllers: [CategoriesController],
	exports: [CategoriesImagesService],
})
export class CategoriesImagesModule { }
