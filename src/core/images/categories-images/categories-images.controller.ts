import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesImagesService } from './categories-images.service';
import { CategoryImagesDTO } from './category-images.dto';

@ApiTags('Categories to images')
@Controller('categories-images')
export class CategoriesController {
	constructor(private readonly categories: CategoriesImagesService) { }

	@Get()
	async getAll() {
		let data = await this.categories.getAll()
		return data
	}
	@Get(':id')
	async getById(@Param('id') id: number) {
		let data = await this.categories.getOne(id)
		return data
	}

	@Post()
	async create(@Body() category: CategoryImagesDTO) {
		let data = await this.categories.create(category)
		return data
	}
	@Put(':id')
	async update(@Body() category: CategoryImagesDTO, @Param('id') id: number) {
		let data = await this.categories.update(category, id)
		return data
	}
	@Delete(':id')
	async delete(@Param('id') id: number) {
		let data = await this.categories.delete(id)
		return data
	}
}
