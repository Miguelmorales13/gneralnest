import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

import { CategoryImages } from '../../../entitys/GategoriesImages.entity';
import { CategoriesImagesService } from './categories-images.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Categories images')
@Crud({
	model: {
		type: CategoryImages
	}
})
@Controller('categories-images')
export class CategoriesController {
	constructor(private readonly service: CategoriesImagesService) { }

}
