import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { CategoryImages } from '../../../entitys/GategoriesImages.entity';
import { CategoryImagesDTO } from './category-images.dto';
import { SequelizeCrudService } from '../../../crud/SequelizeCrudService';

@Injectable()
export class CategoriesImagesService extends SequelizeCrudService<CategoryImages, CategoryImagesDTO>{
	constructor(@Inject('CATEGORY_IMAGES_REPOSITORY') private readonly categoryImages: typeof CategoryImages) {
		super(categoryImages)
	}

}
