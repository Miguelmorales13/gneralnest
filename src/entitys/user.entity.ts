import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, } from 'typeorm';
import { Generar } from './General.entity';
import { generatePassword } from '../config/constants';
import { IsOptional, IsEmail, IsString, IsBoolean } from 'class-validator';

import { CrudValidationGroups } from '@nestjsx/crud';
import { Exclude } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

const { CREATE, UPDATE } = CrudValidationGroups;
/**
 * Entity user
 */
@Entity()
export class User extends Generar {
	@ApiModelProperty({ description: 'user to user DTO' })
	@IsOptional({ groups: [UPDATE], message: 'El nombre del usuario es requerido' })
	@Column({ length: 100 })
	name?: string;

	@ApiModelProperty({ description: 'user to user DTO' })
	@IsOptional({ always: false })
	@Column({ length: 100, unique: true })
	user?: string;

	@ApiModelProperty({ description: 'user to user DTO' })
	@IsEmail({}, { message: 'Verifica que tu correo sea valido' })
	@IsString({ message: 'El correo es requerido' })
	@Column({ length: 100, unique: true })
	email?: string;

	@ApiModelProperty({ description: 'user to user DTO' })
	@Column({ length: 60 })
	@Exclude()
	password?: string;

	@ApiModelProperty({ description: 'user to user DTO' })
	@IsString({ message: 'El apellido es requerido' })
	@Column({ length: 100 })
	lastname?: string;

	@ApiModelProperty({ description: 'if confirm is true is because the email is confimed' })
	@IsOptional({ always: true })
	@IsBoolean({ message: '' })
	@Column()
	confirm?: boolean;


	// @ManyToOne((type) => Rol, (rol) => rol.users, { cascade: true })
	// rol: Rol;

	@ApiModelProperty({ description: 'active' })
	@IsBoolean({ message: 'El estatus activo no es booleano' })
	@Column({ default: true })
	active?: boolean;

	@BeforeInsert()
	setPassword() {
		this.user = this.user
			? this.user
			: this.name.slice(0, 3) +
			this.lastname.slice(0, 3) +
			generatePassword(3);
		this.password = bcrypt.hashSync(this.password, 10);
	}

	comparePassword(compare: string) {
		return bcrypt.compareSync(compare, this.password);
	}
}
