import * as bcrypt from 'bcrypt';
import { BeforeCreate, BelongsTo, Column, ForeignKey, Table, DataType } from 'sequelize-typescript';

import { generatePassword } from '../config/constants';
import { General } from './General.entity';
import { Rol } from './rol.entity';

/**
 * Entity user
 */
@Table({
	paranoid: true,
	timestamps: true,
	underscored: true
})
export class User extends General<User> {
	@Column({ type: DataType.STRING(100) })
	name?: string;

	@Column({ type: DataType.STRING(100) })
	user?: string;

	@Column({ type: DataType.STRING(200) })
	email?: string;

	@Column({
		type: DataType.STRING(60),
		async set(val: string) {
			this.setDataValue('password', await bcrypt.hashSync(val, 10))
		}
	})
	password?: string;

	@Column({ type: DataType.STRING(100) })
	lastName?: string;

	@ForeignKey(() => Rol)
	@Column({ type: DataType.INTEGER })
	rolId?: number;

	@BelongsTo(() => Rol)
	rol?: Rol;

	@Column({ defaultValue: true })
	active?: boolean;

	@BeforeCreate
	static async setPassword(instance: User) {
		instance.user = instance.user ? instance.user : instance.name.slice(0, 3) + instance.lastName.slice(0, 3) + generatePassword(3);
		// instance.password = await bcrypt.hashSync(instance.password, 10);
	}

	async comparePassword(compare: string) {
		return await bcrypt.compareSync(compare, this.password);
	}
}
