import { Column, Entity } from 'typeorm';
import { Generar } from './General.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

/**
 * Entity  rol
 */
@Entity()
export class Rol extends Generar {
	@ApiModelProperty({ description: 'user to user DTO' })
	@Column({ length: 100, unique: true })
	name: string;

	@ApiModelProperty({ description: 'user to user DTO' })
	@Column({ type: 'json' })
	access: Object;

	// @OneToMany((type) => User, (user) => user.rol)
	// users: User[];
}

/**
 * Access
 */
export class Access {
	@ApiModelProperty({ description: 'user to user DTO' })
	@IsBoolean({ message: "El acceso es boolean" })
	read: boolean;
	@ApiModelProperty({ description: 'user to user DTO' })
	@IsBoolean({ message: "El acceso es boolean" })
	write: boolean;
}

/**
 * Rol access
 */
export class RolAccess {
	@ApiModelProperty({ description: 'user to user DTO' })
	@IsOptional({ always: false, message: "El acceso es requerido" })
	users: Access;
	@ApiModelProperty({ description: 'user to user DTO' })
	@IsOptional({ always: false, message: "El acceso es requerido" })
	rols: Access;
}
