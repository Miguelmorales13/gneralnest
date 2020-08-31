import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Table,
	BelongsToMany,
} from 'sequelize-typescript';
import { General } from './General.entity';
import { Module } from './Module.entity';
import { Rol } from './rol.entity';
import { AccessRolUser } from './AccessesRolUser.entity';

/**
 * Entity  rol
 */
@Table({
	paranoid: true,
	timestamps: true,
	underscored: true,
	tableName: 'accesses',
})
export class Access extends General<Access> {
	/**
	 * Name  of rol
	 */
	@Column({ type: DataType.STRING(100), allowNull: false })
	name: string;
	/**
	 * Key name of rol admin
	 */
	@Column({ type: DataType.STRING(100), allowNull: false })
	keyName: string;

	/**
	 * Description  of access
	 */
	@Column({ type: DataType.STRING(200), allowNull: false })
	description: string;

	@BelongsToMany(() => Rol, () => AccessRolUser)
	roles?: Rol[];

	@ForeignKey(() => Module)
	@Column({ type: DataType.INTEGER, allowNull: false })
	moduleId?: number;

	@BelongsTo(() => Module)
	module?: Module;
}
