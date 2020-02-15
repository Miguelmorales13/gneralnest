import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryImages } from '../../../entitys/GategoriesImages.entity';
import { CategoryImagesDTO } from './category-images.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class CategoriesImagesService extends TypeOrmCrudService<CategoryImages> {
	constructor(
		@InjectRepository(CategoryImages) repo,
	) {
		super(repo)
	}

}
