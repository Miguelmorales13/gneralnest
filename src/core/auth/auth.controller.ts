import { Body, Controller, Post, Param, UseGuards, Req } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiImplicitHeader } from '@nestjs/swagger';

import { AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { RecoveryPassowordDTO } from './recovery-password.dto';
import { ResetPassowordDTO } from './reset-password.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private _auth: AuthService) { }

	@Post('login')
	async login(@Body() user: AuthDTO) {
		return this._auth.login(user);
	}
	@Post('recovery-password')
	async recoveryPassword(@Body() recovery: RecoveryPassowordDTO) {
		return this._auth.recoveryPassword(recovery);
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('change-password')
	async resetPassword(@Body() reset: ResetPassowordDTO, @Req() req) {
		console.log(req);

		return this._auth.cahngePassword(reset, req.user.id);
	}
}
