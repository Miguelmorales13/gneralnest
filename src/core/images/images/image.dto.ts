import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CategoryImagesDTO } from '../categories-images/category-images.dto';

/**
 * Image dto
 */
export class ImageDTO {
	@ApiProperty({ description: 'title to image DTO', required: true })
	@IsString({ message: 'The title it´s string' })
	title?: string;

	@ApiProperty({ description: 'description to image DTO', required: false })
	description?: string;

	@ApiProperty({ description: 'url to image DTO', type: 'file', format: 'string', required: true })
	url?: string;

	@ApiProperty({ description: 'public id cloudinary to image DTO', required: false })
	public_id?: string;

	@ApiProperty({ description: 'category to image DTO', required: true })
	category?: CategoryImagesDTO | number;
}
