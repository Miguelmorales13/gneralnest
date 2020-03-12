import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ResetPassowordDTO {
	@ApiModelProperty({ description: 'Password', type: 'string', })
	@IsString({ message: 'auth.before_password_required' })
	oldPassword?: string;

	@ApiModelProperty({ description: 'Password', type: 'string', })
	@IsString({ message: 'auth.new_password_required' })
	newPassword?: string;

	@ApiModelProperty({ description: 'Password', type: 'string', })
	@IsString({ message: 'auth.repit_new_password_required' })
	repitNewPassword?: string;
}
