import { Column, HasMany, Table } from 'sequelize-typescript';

import { General } from './General.entity';
import { Image } from './Image.entity';

/**
 * Entity  rol
 */
@Table({
	paranoid: true,
	timestamps: true
})
export class CategoryImages extends General<CategoryImages> {
	@Column
	name?: string;

	@Column
	description?: string;

	@Column
	isSystem?: boolean;

	@HasMany(() => Image)
	images?: Image[];
}
