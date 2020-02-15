import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Generar } from './General.entity';
import { CategoryImages } from './GategoriesImages.entity';

/**
 * Entity  images
 */
@Entity()
export class Image extends Generar {
	@Column({ length: 100, nullable: false, unique: true })
	title: string;

	@Column({ length: 250, nullable: true })
	description: string;

	@Column({ length: 200, nullable: false })
	url: string;

	@Column({ length: 100, nullable: false })
	public_id: string;

	@ManyToOne(
		(type) => CategoryImages,
		(category) => category.images,
		{ cascade: true, nullable: false },
	)
	category: CategoryImages;
}
