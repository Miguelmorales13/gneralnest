import { Entity, Column, OneToMany, Exclusion } from 'typeorm';
import { Generar } from './General.entity';
import { Image } from './Image.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Entity  rol
 */
@Entity({
	name: 'categories_images',
	withoutRowid: true
})
@Exclusion(`deletedAt = null`)
export class CategoryImages extends Generar {
	@Column({ length: 100, unique: true })
	@ApiModelProperty({ description: 'name to category DTO' })
	@IsString({ message: 'El nombre es una cadena' })
	name: string;

	@Column({ length: 100, nullable: true })
	@ApiModelProperty({ description: 'description to category DTO' })
	description: string;

	@Column({ default: false })
	@ApiModelProperty({ description: 'isSystem to category DTO' })
	isSystem: boolean;

	@OneToMany((type) => Image, (image) => image.category)
	images: Image[];
}
