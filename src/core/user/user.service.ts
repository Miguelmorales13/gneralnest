import { Inject, Injectable } from '@nestjs/common';

import { SequelizeCrudService } from '../../crud/SequelizeCrudService';
import { User } from '../../entitys/user.entity';
import { UserDTO } from './user.dto';
import { Op } from 'sequelize';

/**
 * Injectable
 * UserService
 */
@Injectable()
export class UserService extends SequelizeCrudService<User, UserDTO> {
	constructor(@Inject('USERS_REPOSITORY') readonly users: typeof User) {
		super(users)
	}
	async getByUser(user: string): Promise<User> {
		// this.users.destroy
		return await this.users.findOne({
			where: {
				[Op.or]: [
					{ email: user },
					{ user: user },
				]
			}
		})
	}
}
