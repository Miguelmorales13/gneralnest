import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

import { CategoryImages } from '../../../entitys/GategoriesImages.entity';
import { CategoriesImagesService } from './categories-images.service';
import { CategoryImagesDTO } from './category-images.dto';


@Controller('categories-images')
export class CategoriesController {
	constructor(private readonly _images: CategoriesImagesService) { }

	@Get()
	async getAll() {
		let result = await this._images.getAll()
		return [result]
	}
	@Get(':id')
	async getById(@Param(':id') id: number) {
		let result = await this._images.getOne(id)
		return [result, result ? 'No se encontro el registro' : null]
	}
	@Post()
	async create(@Body() image: CategoryImagesDTO) {
		let result = await this._images.create(image)
		return [result, `Creacion de rol exitosa con el id ${result.id}`]
	}
	@Put(':id')
	async update(@Body() image: CategoryImagesDTO, @Param('id') id: number) {
		let result = await this._images.update(image, id)
		return [result, `Actualizacion de rol exitosa`]
	}
	@Delete(':id')
	async delete(@Param('id') id: number) {
		let result = await this._images.delete(id)
		return [result, 'Eliminacion de usaurio exitosa']
	}
}
