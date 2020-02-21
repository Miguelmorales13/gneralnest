import { Column, HasMany, Table, DataType } from 'sequelize-typescript';

import { General } from './General.entity';
import { Image } from './Image.entity';

/**
 * Entity  rol
 */
@Table({
	paranoid: true,
	timestamps: true,
	underscored: true
})
export class CategoryImages extends General<CategoryImages> {
	@Column({ type: DataType.STRING(100) })
	name?: string;

	@Column({ type: DataType.STRING(200) })
	description?: string;

	@Column({ defaultValue: false })
	isSystem?: boolean;

	@HasMany(() => Image)
	images?: Image[];
}
