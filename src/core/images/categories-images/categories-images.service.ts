import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { CategoryImages } from '../../../entitys/GategoriesImages.entity';
import { CategoryImagesDTO } from './category-images.dto';

@Injectable()
export class CategoriesImagesService {
	constructor(@Inject('CATEGORY_IMAGES_REPOSITORY') private readonly categoryImages: typeof CategoryImages) { }


	async getAll(): Promise<CategoryImages[]> {
		return await this.categoryImages.findAll()
	}
	async getOne(id: number): Promise<CategoryImages> {
		return await this.categoryImages.findByPk(id)
	}

	async create(categoryImage: Partial<CategoryImagesDTO>): Promise<CategoryImages> {
		let categoryImageCreated = await this.categoryImages.create(categoryImage)
		return categoryImageCreated;
	}
	async createBulk(categoryImages: Partial<CategoryImagesDTO[]>) {
		let categoryImagesCreated = await this.categoryImages.bulkCreate(categoryImages)
		return categoryImagesCreated
	}
	async update(categoryImage: Partial<CategoryImagesDTO>, id: number) {
		this.categoryImages.update(categoryImage, { where: { id }, limit: 1 })
	}
	async delete(id: number) {
		this.categoryImages.destroy({ where: { id }, limit: 1 })
	}
}
