import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDTO {

	@ApiModelProperty({ description: 'user to login', type: 'string' })
	@IsString({ message: 'auth.user_required' })
	user?: string;

	@ApiModelProperty({ description: 'password to login', type: 'string' })
	@IsString({ message: 'auth.password_required' })
	password?: string;
}
