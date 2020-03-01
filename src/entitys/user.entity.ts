import * as bcrypt from 'bcrypt';
import { BeforeCreate, BelongsTo, Column, ForeignKey, Table, DataType, NotNull, Is, AfterFind, DefaultScope } from 'sequelize-typescript';

import { generatePassword } from '../config/constants';
import { General } from './General.entity';
import { Rol } from './rol.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Entity user
 */
@DefaultScope(() => ({
	include: [{
		model: Rol,
		required: false
	}]
}))
@Table({
	paranoid: true,
	timestamps: true,
	underscored: true
})
export class User extends General<User> {
	@Column({ type: DataType.STRING(100), allowNull: false })
	name?: string;

	@Is(async function Unique(value: string) {
		let user = await User.findOne({ where: { user: value }, attributes: ['id'] })
		if (user && user.id != this.id) throw new HttpException('Usuario ya registrado', HttpStatus.CONFLICT);
	})
	@Column({ type: DataType.STRING(100), allowNull: false })
	user?: string;

	@Is(async function Unique(value: string) {
		let user = await User.findOne({ where: { email: value }, attributes: ['id'] })
		if (user && user.id != this.id) throw new HttpException('Correo ya registrado', HttpStatus.CONFLICT);
	})
	@Column({ type: DataType.STRING(200), allowNull: false })
	email?: string;

	@Column({ type: DataType.STRING(60), })
	password?: string;

	@Column({ type: DataType.STRING(100), allowNull: false })
	lastName?: string;

	@ForeignKey(() => Rol)
	@Column({ type: DataType.INTEGER, allowNull: true })
	rolId?: number;

	@BelongsTo(() => Rol)
	rol?: Rol;

	@Column({ defaultValue: true, allowNull: false })
	active?: boolean;

	@BeforeCreate
	static async setPassword(instance: User) {
		instance.password = await bcrypt.hashSync(instance.password, 10);
	}
	async comparePassword(compare: string) {
		return await bcrypt.compareSync(compare, this.password);
	}
}
