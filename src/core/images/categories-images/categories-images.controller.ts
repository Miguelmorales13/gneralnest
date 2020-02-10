import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

import { CategoryImages } from '../../../entitys/GategoriesImages.entity';
import { CategoriesImagesService } from './categories-images.service';
import { CategoryImagesDTO } from './category-images.dto';


@Controller('categories-images')
export class CategoriesController {
	constructor(private readonly service: CategoriesImagesService) { }

}
