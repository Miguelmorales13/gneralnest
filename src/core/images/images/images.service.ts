import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Image } from '../../../entitys/Image.entity';

@Injectable()
export class ImagesService extends TypeOrmCrudService<Image>{
	constructor(
		@InjectRepository(Image) repo,
	) {
		super(repo)
	}


	getTest() {
		return this.repo.find({})
	}

}
