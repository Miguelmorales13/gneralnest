import { Inject, Injectable } from '@nestjs/common';
import { SequelizeCrudService } from '../../../crud/SequelizeCrudService';
import { CategoryImages } from '../../../entities/CategoriesImages.entity';
import { CategoryImagesDTO } from './category-images.dto';

@Injectable()
export class CategoriesImagesService extends SequelizeCrudService<
	CategoryImages,
	CategoryImagesDTO
> {
	constructor(
		@Inject('CATEGORY_IMAGES_REPOSITORY')
		private readonly categoryImages: typeof CategoryImages,
	) {
		super(categoryImages);
	}
}
