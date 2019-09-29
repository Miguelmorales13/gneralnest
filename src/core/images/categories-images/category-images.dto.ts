import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

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
