import { Entity, Column, OneToMany, ManyToOne, AfterLoad } from 'typeorm';
import { Generar } from './General.entity';
import { CategoryImages } from './GategoriesImages.entity';
import { ApiModelProperty, ApiImplicitFile } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsEmpty, IsNotEmptyObject } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;
/**
 * Entity  images
 */
@Entity()
export class Image extends Generar {
	@ApiModelProperty({ description: 'title to image DTO' })
	@IsString({ message: 'El titulo es una cadena' })
	@Column({ length: 100, nullable: true })
	title: string;

	@ApiModelProperty({ description: 'title to image DTO', required: false })
	@Column({ length: 250, nullable: true })
	description: string;

	@ApiModelProperty({ description: 'name image', required: true, type: 'file', format: 'binary' })
	// @IsOptional({ always: false, message: 'La imagen es requerida' })
	// @IsNotEmptyObject({ message: 'La imagen es requerida' })
	@Column({ length: 200, nullable: false })
	url: string;

	// @Column({ length: 100, nullable: false })
	// public_id: string;

	@ApiModelProperty({ description: 'Categoy ', required: false, type: 'number' })
	@ManyToOne(
		(type) => CategoryImages,
		(category) => category.images,
		{ cascade: true, nullable: true, eager: true },
	)
	category: CategoryImages | number;


	@AfterLoad()
	finded() {
		this.url = `${process.env.HOST_COMPLETE}/images/${this.url}`;
	}
}
