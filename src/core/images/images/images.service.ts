import { Inject, Injectable } from '@nestjs/common';

import { SequelizeCrudService } from '../../../crud/SequelizeCrudService';
import { Image } from '../../../entitys/Image.entity';
import { ImageDTO } from './image.dto';

@Injectable()
export class ImagesService extends SequelizeCrudService<Image, ImageDTO> {
	constructor(@Inject('IMAGES_REPOSITORY') private readonly images: typeof Image) {
		super(images)
	}

}
