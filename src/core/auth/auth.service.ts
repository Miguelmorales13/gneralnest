import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { API_URL, generatePassword } from '../../config/constants';
import { EmailsService } from '../../helpers/emails/emails.service';
import { UserService } from '../user/user.service';
import { AuthDTO } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { ResetPassowordDTO } from './reset-password.dto';
import { RecoveryPassowordDTO } from './recovery-password.dto';

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

	async validateUser({ data }: any) {
		console.log(data);

		return await this._users.getByUser(data.email);
	}

	async login(payload: Partial<AuthDTO>) {
		let user = await this._users.getByUser(payload.user);

		if (!user || !(await user.comparePassword(payload.password))) {
			throw new HttpException(
				{
					error: 'Credenciales invalidas',
					where: this.service + '::validateUser',
				},
				HttpStatus.UNAUTHORIZED,
			);
		}
		let userLogged = {
			id: user.id,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			name: user.name,
			email: user.email,
			user: user.user,
			lastName: user.lastName,
			rolId: user.rolId,
			rol: user.rol || null,
		}
		if (!user.active) {
			throw new HttpException(
				{
					error: 'Usuario dado de baja',
					where: this.service + '::login',
				},
				HttpStatus.UNAUTHORIZED,
			);
		}

		const token = await this._jwt.sign({
			data: userLogged,
			iss: API_URL + '/auth/login',
		});
		return { token, user: userLogged };
	}
	async recoveryPassword(payload: Partial<RecoveryPassowordDTO>) {
		const user = await this._users.getByUser(payload.email);
		let userLogged
		if (user) {
			let newPassword = await generatePassword(6)
			const password = await bcrypt.hashSync(newPassword, 10);
			await this._users.update({ password }, user.id);
			const token = await this._jwt.signAsync({
				data: user,
			});
			await this._email.sendMail(
				process.env.EMAIL_USER,
				payload.email,
				'Recuperar contraseña - plataforma de "Hoteles"',
				'text',
				await this._email.generateTemplate<any>('recovery-password', {
					newPassword,
					email: payload.email,
					token,
				}),
			);
			userLogged = {
				id: user.id,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				name: user.name,
				email: user.email,
				user: user.user,
				lastName: user.lastName,
				rolId: user.rolId,
				rol: user.rol || null,
			}

		}
		return userLogged || null;
	}
	async cahngePassword(payload: Partial<ResetPassowordDTO>, id: number) {
		const user = await this._users.getOne(id);
		if (!user) {
			throw new HttpException('Usuario no registrado', HttpStatus.BAD_REQUEST);
		}
		if (!await user.comparePassword(payload.oldPassword)) {
			throw new HttpException('La contraseña anterior no coinside', HttpStatus.BAD_REQUEST);
		}
		if (payload.newPassword != payload.repitNewPassword) {
			throw new HttpException('La contraseñas no coinsiden', HttpStatus.BAD_REQUEST);
		}
		const password = await bcrypt.hashSync(payload.newPassword, 10);
		await this._users.update({ password }, user.id);
		let userLogged = {
			id: user.id,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			name: user.name,
			email: user.email,
			user: user.user,
			lastName: user.lastName,
			rolId: user.rolId,
			rol: user.rol || null,
		}
		return userLogged;
	}
}
