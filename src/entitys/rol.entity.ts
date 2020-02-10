import { General } from './General.entity';
import { Table, Column, DataType } from 'sequelize-typescript';

/**
 * Entity  rol
 */
@Table({
	paranoid: true,
	timestamps: true
})
export class Rol extends General<Rol> {
	@Column
	name: string;

	@Column({ type: DataType.JSON })
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
