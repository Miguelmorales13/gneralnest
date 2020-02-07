import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

import { ImageEntity } from '../../../entitys/Image.entity';
import { ImageDTO } from './image.dto';
import { ImagesService } from './images.service';

@Crud({
	model: {
		type: ImageEntity,
	},
	dto: {
		create: ImageDTO,
		update: ImageDTO,
		replace: ImageDTO
	},
})
@Controller('images')
export class ImagesController {
	constructor(private readonly service: ImagesService) { }

}
