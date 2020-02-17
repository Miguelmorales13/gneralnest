import { Inject, Injectable } from '@nestjs/common';

import { SequelizeCrudService } from '../../crud/SequelizeCrudService';
import { User } from '../../entitys/user.entity';
import { UserDTO } from './user.dto';

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
				$or: [
					{ email: user },
					{ user: user },
				]
			}
		})
	}
}
