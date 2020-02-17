import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { ImageDTO } from './image.dto';
import { ImagesService } from './images.service';
import { SequelizeCrudController } from '../../../crud/SequelizeCrudController';
import { ApiUseTags } from '@nestjs/swagger';
import { Image } from '../../../entitys/Image.entity';


@ApiUseTags('Images')
@Controller('images')
export class ImagesController extends SequelizeCrudController<Image, ImageDTO, ImagesService> {

	constructor(private readonly images: ImagesService) {
		super(images)
	}
}

