import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '../../config/config.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly _auth: AuthService,
		private readonly _config: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: _config.get('TOKEN_SECRET'),
		});
	}

	async validate(payload: any) {
		if (!payload || !payload.data || !payload.data.email) {
			throw new HttpException(
				{
					error: 'Sin autorizacion',
					where: 'AuthStrategy::validate',
				},
				HttpStatus.UNAUTHORIZED,
			);
		}
		let user = await this._auth.validateUser(payload);
		if (!user) {
			throw new HttpException(
				{
					error: 'Sin autorizacion',
					where: 'AuthStrategy::validate',
				},
				HttpStatus.UNAUTHORIZED,
			);
		}
		return payload.data;
	}
}
