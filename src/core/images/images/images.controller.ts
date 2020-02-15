import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { generateStorageMulter } from '../../../config/constants';
import { ImageDTO } from './image.dto';
import { ImagesService } from './images.service';
import { Crud } from '@nestjsx/crud';
import { Image } from '../../../entitys/Image.entity';


@Crud({
	model: {
		type: Image
	}
})
@Controller('images')
export class ImagesController {
	constructor(private readonly _images: ImagesService) { }

}
