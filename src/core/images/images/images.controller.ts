import { Controller, UploadedFiles, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';

import { generateStorageMulter } from '../../../config/constants';
import { Image } from '../../../entitys/Image.entity';
import { ImagesService } from './images.service';
import { ApiUseTags, ApiConsumes, ApiImplicitFile } from '@nestjs/swagger';


@ApiUseTags('Images')
@Crud({
	model: {
		type: Image
	},

})
@Controller('images')
export class ImagesController {
	constructor(public service: ImagesService) { }

	get base(): CrudController<Image> {
		return this;
	}


	@Override()
	@ApiConsumes('multipart/form-data')
	// @ApiImplicitFile({ description: '', name: 'image' })
	@UseInterceptors(
		FilesInterceptor('url', 1, generateStorageMulter('images')),
	)
	createOne(
		@ParsedRequest() req: CrudRequest,
		@ParsedBody() dto: Image,
		@UploadedFiles() files
	) {
		if (!files[0]) {
			throw new HttpException(
				{
					error: 'La imagen es requerida',
					where: this.service + '::createOne',
				},
				HttpStatus.BAD_REQUEST,
			);
		}
		dto.url = files[0] ? files[0].filename : null
		return this.base.createOneBase(req, dto);
	}
}
