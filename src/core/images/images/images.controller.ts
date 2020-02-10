import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

import { Image } from '../../../entitys/Image.entity';
import { ImageDTO } from './image.dto';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
	constructor(private readonly service: ImagesService) { }

}
