import { Column, Entity } from 'typeorm';
import { Generar } from './General.entity';

/**
 * Entity  rol
 */
@Entity()
export class Rol extends Generar {
	@Column({ length: 100, unique: true })
	name: string;

	@Column({ type: 'json' })
	access: RolAccess;

	// @OneToMany((type) => User, (user) => user.rol)
	// users: User[];
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
