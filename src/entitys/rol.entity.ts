import { Column, DataType, Table } from 'sequelize-typescript';

import { General } from './General.entity';

/**
 * Entity  rol
 */
@Table({
	paranoid: true,
	timestamps: true,
	underscored: true
})
export class Rol extends General<Rol> {
	@Column({ type: DataType.STRING(100), allowNull: false })
	name: string;

	@Column({ type: DataType.JSON, allowNull: false })
	access: RolAccess;

	// @OneToMany((type) => UserEntity, (user) => user.rol)
	// users: UserEntity[];
}

/**
 * Access
 */
export interface Access {
	read: boolean;
	write: boolean;
}

/**
 * Rol access
 */
export interface RolAccess {
	users: Access;
	rols: Access;
}
