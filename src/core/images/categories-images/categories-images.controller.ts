import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesImagesService } from './categories-images.service';
import { CategoryImagesDTO } from './category-images.dto';
import { Crud } from '@nestjsx/crud';
import { CategoryImages } from '../../../entitys/GategoriesImages.entity';


@Crud({
	model: {
		type: CategoryImages
	}
})
@Controller('categories-images')
export class CategoriesController {
	constructor(private readonly _categoryImages: CategoriesImagesService) { }

}
