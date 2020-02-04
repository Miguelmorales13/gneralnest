import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * CategoriyImage dto
 */
export class CategoryImagesDTO {
	@ApiModelProperty({ description: 'name to category DTO' })
	@IsString({ message: 'El nombre es una cadena' })
	name?: string;

	@ApiModelProperty({ description: 'description to category DTO' })
	description?: string;

	@ApiModelProperty({ description: 'isSystem to category DTO' })
	isSystem?: boolean;
}
