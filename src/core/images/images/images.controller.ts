import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { ImageDTO } from './image.dto';
import { ImagesService } from './images.service';


@ApiUseTags('Images')
@Controller('images')
export class ImagesController {

	constructor(private readonly images: ImagesService) { }
	@Get()
	async getAll() {
		let data = await this.images.getAll()
		return data
	}
	@Get(':id')
	async getById(@Param(':id') id: number) {
		let data = await this.images.getOne(id)
		return data
	}

	@Post()
	async create(@Body() image: ImageDTO) {
		let data = await this.images.create(image)
		return data
	}
	@Put(':id')
	async update(@Body() image: ImageDTO, @Param('id') id: number) {
		let data = await this.images.update(image, id)
		return data
	}
	@Delete(':id')
	async delete(@Param('id') id: number) {
		let data = await this.images.delete(id)
		return data
	}
}

