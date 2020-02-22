import { BelongsTo, Column, ForeignKey, Table, DefaultScope, Is } from 'sequelize-typescript';

import { CategoryImages } from './GategoriesImages.entity';
import { General } from './General.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Entity  images
 */
@DefaultScope(() => ({
	include: [{
		model: CategoryImages,
		required: true
	}]
}))
@Table({
	paranoid: true,
	timestamps: true,
	underscored: true
})
export class Image extends General<Image> {
	@Is(async function Unique(value: string) {
		let image = await Image.findOne({ where: { title: value }, attributes: ['id'] })
		if (image) throw new HttpException('Titulo ya registrado', HttpStatus.CONFLICT);
	})
	@Column({ allowNull: false })
	title?: string;

	@Column
	description?: string;

	@Column({ allowNull: false })
	url?: string;

	@Column({ allowNull: true })
	public_id: string;

	@ForeignKey(() => CategoryImages)
	@Column({ allowNull: false })
	categoryId?: number;

	@BelongsTo(() => CategoryImages)
	category: CategoryImages;
}
