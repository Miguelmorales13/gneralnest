import { Inject, Injectable } from '@nestjs/common';

import { SequelizeCrudService } from '../../crud/SequelizeCrudService';
import { User } from '../../entitys/user.entity';
import { UserDTO } from './user.dto';
import { Op } from 'sequelize';
import { generatePassword } from '../../config/constants';
import { EmailsService } from '../../helpers/emails/emails.service';
import { ConfigService } from '../../config/config.service';

/**
 * Injectable
 * UserService
 */
@Injectable()
export class UserService extends SequelizeCrudService<User, UserDTO> {
	constructor(
		@Inject('USERS_REPOSITORY') readonly users: typeof User,
		private readonly _emails: EmailsService,
		private readonly _config: ConfigService,
	) {
		super(users)
	}
	/**
	 * Gets by user
	 * @param user
	 * @returns by user
	 */
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
	/**
	 * Creates user service
	 * @param user
	 * @returns create
	 */
	async create(user: Partial<UserDTO>): Promise<User> {
		let password = await generatePassword(8)
		let userName = user.user ? user.user : user.name.slice(0, 3) + user.lastName.slice(0, 3) + generatePassword(3);
		let itemCreated = await this.users.create({ ...user, password, user: userName })
		await this._emails.sendMail(
			this._config.get('EMAIL_USER'),
			user.email,
			'Registro en la plataforma "nueva"',
			'text',
			await this._emails.generateTemplate<any>('subscription', {
				password,
				userName
			}),
		);
		return this.getOne(itemCreated.id);
	}
}
