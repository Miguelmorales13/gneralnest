import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private _auth: AuthService) { }

	@Post('login')
	async login(@Body() user: AuthDTO) {
		return this._auth.login(user);
	}
}
