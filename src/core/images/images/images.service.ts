import { Inject, Injectable } from '@nestjs/common';
import { SequelizeCrudService } from '../../../crud/SequelizeCrudService';
import { Image } from '../../../entities/Image.entity';
import { ImageDTO } from './image.dto';


@Injectable()
export class ImagesService extends SequelizeCrudService<Image, ImageDTO> {
	constructor(@Inject('IMAGES_REPOSITORY') private readonly images: typeof Image) {
		super(images)
	}

	// async create(item: Partial<ImageDTO>): Promise<Image> {
	// 	let itemCreated = await this.images.create({ ...item }, { include: [{ model: CategoryImages }] })
	// 	return await this.getOne(itemCreated.id)
	// }

}
