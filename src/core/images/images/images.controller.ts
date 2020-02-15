import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { ImageDTO } from './image.dto';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {

	constructor(private readonly _images: ImagesService) { }
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
	async create(@Body() image: ImageDTO) {
		let result = await this._images.create(image)
		return [result, `Creacion de rol exitosa con el id ${result.id}`]
	}
	@Put(':id')
	async update(@Body() image: ImageDTO, @Param('id') id: number) {
		let result = await this._images.update(image, id)
		return [result, `Actualizacion de rol exitosa`]
	}
	@Delete(':id')
	async delete(@Param('id') id: number) {
		let result = await this._images.delete(id)
		return [result, 'Eliminacion de usaurio exitosa']
	}
}

