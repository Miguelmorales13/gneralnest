import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

import { CategoryImages } from '../../../entitys/GategoriesImages.entity';
import { CategoriesImagesService } from './categories-images.service';
import { CategoryImagesDTO } from './category-images.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { SequelizeCrudController } from '../../../crud/SequelizeCrudController';


@ApiUseTags('Categories to images')
@Controller('categories-images')
export class CategoriesController extends SequelizeCrudController<CategoryImages, CategoryImagesDTO, CategoriesImagesService> {
	constructor(private readonly categories: CategoriesImagesService) {
		super(categories)
	}
}
