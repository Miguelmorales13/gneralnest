import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { API_URL } from '../../config/constants';
import { EmailsService } from '../../helpers/emails/emails.service';
import { UserService } from '../user/user.service';
import { AuthDTO } from './auth.dto';
import { ResetPassowordDTO } from './resetPassword.dto';

/**
 * Injectable
 */
@Injectable()
export class AuthService {
	private readonly service = 'AuthService';
	constructor(
		private readonly _users: UserService,
		private readonly _jwt: JwtService,
		private readonly _email: EmailsService,
	) { }

	async validateUser({ user }: any) {
		return await this._users.getByUser(user.user);
	}

	async login(payload: Partial<AuthDTO>) {
		const user = await this._users.getByUser(payload.user);
		if (!user || !(await user.comparePassword(payload.password))) {
			throw new HttpException(
				{
					error: 'Credenciales invalidas',
					where: this.service + '::validateUser',
				},
				HttpStatus.UNAUTHORIZED,
			);
		}
		const token = await this._jwt.sign({
			data: user,
			iss: API_URL + '/auth/login',
		});
		return { token, user };
	}
	async resetPassword(payload: Partial<ResetPassowordDTO>) {
		const user = await this._users.getByUser(payload.email);
		// if (!user) {
		//     throw new HttpException(
		//         {
		//             error: `Usuario no registrado, se envio el correo a ${payload.email}`,
		//             where: this.service + '::resetPassword',
		//         },
		//         HttpStatus.OK,
		//     );
		// }
		return {
			message: `Usuario no registrado, se envio el correo a ${
				payload.email
				}`,
		};
	}
}
