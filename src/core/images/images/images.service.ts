import { Inject, Injectable } from '@nestjs/common';

import { Image } from '../../../entitys/Image.entity';
import { ImageDTO } from './image.dto';
import { SequelizeCrudService } from '../../../crud/SequelizeCrudService';

@Injectable()
export class ImagesService extends SequelizeCrudService<Image, ImageDTO> {
	constructor(@Inject('IMAGES_REPOSITORY') private readonly images: typeof Image) {
		super(images)
	}

}
