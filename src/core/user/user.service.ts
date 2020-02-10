import { Inject, Injectable } from '@nestjs/common';

import { User } from '../../entitys/user.entity';
import { UserDTO } from './user.dto';

/**
 * Injectable
 * UserService
 */
@Injectable()
export class UserService {
	constructor(@Inject('USERS_REPOSITORY') private readonly users: typeof User) { }


	async getAll(): Promise<User[]> {
		return await this.users.findAll()
	}
	async getOne(id: number): Promise<User> {
		return await this.users.findByPk(id)
	}
	async getByUser(user: string): Promise<User> {
		return await this.users.findOne({
			where: {
				$or: [
					{ email: user },
					{ user: user },
				]
			}
		})
	}
	async create(user: Partial<UserDTO>): Promise<User> {

		let userCreated = await this.users.create(user)
		return userCreated;
	}
	async createBulk(users: Partial<UserDTO[]>) {
		let usersCreated = await this.users.bulkCreate(users)
		return usersCreated
	}
	async update(user: Partial<UserDTO>, id: number) {
		await this.users.update(user, { where: { id }, limit: 1 })
		return await this.getOne(id)
	}
	async delete(id: number) {
		return this.users.destroy({ where: { id }, limit: 1 })
	}


}
