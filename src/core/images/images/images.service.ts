import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { ImageEntity } from '../../../entitys/Image.entity';

@Injectable()
export class ImagesService extends TypeOrmCrudService<ImageEntity> {
	constructor(@InjectRepository(ImageEntity) repo) {
		super(repo);
	}
}
