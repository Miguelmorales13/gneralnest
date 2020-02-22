import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { CategoryImagesDTO } from '../categories-images/category-images.dto';

/**
 * Image dto
 */
export class ImageDTO {
	@ApiModelProperty({ description: 'title to image DTO', required: true })
	@IsString({ message: 'El titulo es una cadena' })
	title?: string;

	@ApiModelProperty({ description: 'description to image DTO', required: false })
	description?: string;

	@ApiModelProperty({ description: 'url to image DTO', type: 'file', format: 'string', required: true })
	url?: string;

	@ApiModelProperty({ description: 'public id cloudinary to image DTO', required: false })
	public_id?: string;

	@ApiModelProperty({ description: 'category to image DTO', required: true })
	category?: CategoryImagesDTO | number;
}
