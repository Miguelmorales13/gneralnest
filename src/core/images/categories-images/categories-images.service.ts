import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { CategoriesImagesEntity } from '../../../entitys/GategoriesImages.entity';

@Injectable()
export class CategoriesImagesService extends TypeOrmCrudService<CategoriesImagesEntity> {
	constructor(@InjectRepository(CategoriesImagesEntity) repo) {
		super(repo);
	}
}
