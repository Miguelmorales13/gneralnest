import { Inject, Injectable } from '@nestjs/common';

import { Image } from '../../../entitys/Image.entity';
import { ImageDTO } from './image.dto';

@Injectable()
export class ImagesService {
	constructor(@Inject('IMAGES_REPOSITORY') private readonly images: typeof Image) { }


	async getAll(): Promise<Image[]> {
		return await this.images.findAll()
	}
	async getOne(id: number): Promise<Image> {
		return await this.images.findByPk(id)
	}

	async create(image: Partial<ImageDTO>): Promise<Image> {
		let imageCreated = await this.images.create(image)
		return imageCreated;
	}
	async createBulk(images: Partial<ImageDTO[]>) {
		let imagesCreated = await this.images.bulkCreate(images)
		return imagesCreated
	}
	async update(image: Partial<ImageDTO>, id: number) {
		this.images.update(image, { where: { id }, limit: 1 })
	}
	async delete(id: number) {
		this.images.destroy({ where: { id }, limit: 1 })
	}
}
