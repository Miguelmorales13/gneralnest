import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { generateStorageMulter } from '../../../config/constants';
import { ImageDTO } from './image.dto';
import { ImagesService } from './images.service';



@ApiTags('Images')
@Controller('images')
export class ImagesController {

	constructor(private readonly images: ImagesService) { }
	@Get()
	async getAll() {
		let data = await this.images.getAll()
		return data
	}
	@Get(':id')
	async getById(@Param('id') id: number) {
		let data = await this.images.getOne(id)
		return data
	}

	@Post()
	@ApiConsumes('multipart/form-data')
	// @ApiImplicitFile({ description: '', name: 'image' })
	@UseInterceptors(
		FilesInterceptor('url', 1, generateStorageMulter('images')),
	)
	async create(@Body() image: ImageDTO, @UploadedFiles() files) {
		if (!files[0]) {
			throw new HttpException(
				{
					error: 'La imagen es requerida',
					where: 'UsersService::createOne',
				},
				HttpStatus.BAD_REQUEST,
			);
		}
		image.url = files[0] ? files[0].filename : null
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

