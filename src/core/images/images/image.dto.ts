import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { CategoryImagesDTO } from '../categories-images/category-images.dto';

/**
 * Image dto
 */
export class ImageDTO {
	@ApiModelProperty({ description: 'title to image DTO' })
	@IsString({ message: 'El titulo es una cadena' })
	title?: string;

	@ApiModelProperty({ description: 'description to image DTO' })
	description?: string;

	@ApiModelProperty({ description: 'description to image DTO', })
	url?: string;

	@ApiModelProperty({ description: 'description to image DTO' })
	public_id?: string;

	@ApiModelProperty({ description: 'category to image DTO' })
	category?: CategoryImagesDTO | number;
}
