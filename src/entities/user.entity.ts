import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BeforeCreate, BelongsTo, Column, DataType, DefaultScope, ForeignKey, Is, Table } from 'sequelize-typescript';
import { General } from './General.entity';
import { Rol } from './rol.entity';


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
		if (user && user.id != this.id) throw new Error('validations.users.user_already_exist');
	})
	@Column({ type: DataType.STRING(100), allowNull: false })
	user?: string;

	@Is(async function Unique(value: string) {
		let user = await User.findOne({ where: { email: value }, attributes: ['id'] })
		if (user && user.id != this.id) throw new Error('validations.users.email_already_exist');
	})
	@Column({ type: DataType.STRING(200), allowNull: false })
	email?: string;

	@Column({ type: DataType.STRING(60), })
	password?: string;

	@Column({ type: DataType.STRING(100), allowNull: false })
	lastName?: string;

	@ForeignKey(() => Rol)
	@Column({ type: DataType.INTEGER, allowNull: false })
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
