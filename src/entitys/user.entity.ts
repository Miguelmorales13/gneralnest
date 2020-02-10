import * as bcrypt from 'bcrypt';
import { General } from './General.entity';
import { generatePassword } from '../config/constants';
import { Table, Column, BeforeCreate } from 'sequelize-typescript';
/**
 * Entity user
 */
@Table({
	paranoid: true,
	timestamps: true
})
export class User extends General<User> {
	@Column
	name?: string;

	@Column
	user?: string;

	@Column
	email?: string;

	@Column
	password?: string;

	@Column
	lastname?: string;

	// @ManyToOne((type) => RolEntity, (rol) => rol.users, { cascade: true })
	// rol: RolEntity;

	@Column({ defaultValue: true })
	active?: boolean;

	@BeforeCreate
	static async setPassword(instance: User) {
		instance.user = instance.user ? instance.user : instance.name.slice(0, 3) + instance.lastname.slice(0, 3) + generatePassword(3);
		instance.password = await bcrypt.hashSync(instance.password, 10);
	}

	async comparePassword(compare: string) {
		return await bcrypt.compareSync(compare, this.password);
	}
}
