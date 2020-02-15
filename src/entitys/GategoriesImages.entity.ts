import { Entity, Column, OneToMany } from 'typeorm';
import { Generar } from './General.entity';
import { Image } from './Image.entity';

/**
 * Entity  rol
 */
@Entity('categories_images')
export class CategoryImages extends Generar {
	@Column({ length: 100, unique: true })
	name: string;

	@Column({ length: 100, nullable: true })
	description: string;

	@Column({ default: false })
	isSystem: boolean;

	@OneToMany((type) => Image, (image) => image.category)
	images: Image[];
}
