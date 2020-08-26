import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * CategoriyImage dto
 */
export class CategoryImagesDTO {
	@ApiProperty({ description: 'name to category DTO' })
	@IsString({ message: 'the name it´s string' })
	name?: string;

	@ApiProperty({ description: 'description to category DTO' })
	description?: string;

	@ApiProperty({ description: 'isSystem to category DTO' })
	isSystem?: boolean;
}
