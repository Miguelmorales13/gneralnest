import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';

import { CategoryImages } from './GategoriesImages.entity';
import { General } from './General.entity';

/**
 * Entity  images
 */
@Table({
	paranoid: true,
	timestamps: true,
	underscored: true
})
export class Image extends General<Image> {
	@Column
	title: string;

	@Column
	description: string;

	@Column
	url: string;

	@Column
	public_id: string;

	@ForeignKey(() => CategoryImages)
	@Column
	categoryId: number;

	@BelongsTo(() => CategoryImages)
	category: CategoryImages;
}
