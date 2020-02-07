import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

import { CategoriesImagesEntity } from '../../../entitys/GategoriesImages.entity';
import { CategoriesImagesService } from './categories-images.service';
import { CategoryImagesDTO } from './category-images.dto';

@Crud({
	model: {
		type: CategoriesImagesEntity,
	},
	dto: {
		create: CategoryImagesDTO,
		update: CategoryImagesDTO,
		replace: CategoryImagesDTO
	},
})
@Controller('categories-images')
export class CategoriesController {
	constructor(private readonly service: CategoriesImagesService) { }

}
