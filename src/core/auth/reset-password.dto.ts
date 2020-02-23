import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ResetPassowordDTO {
	@ApiModelProperty({ description: 'Password', type: 'string', })
	@IsString({ message: 'La anterio contraseña es requerida' })
	oldPassword?: string;

	@ApiModelProperty({ description: 'Password', type: 'string', })
	@IsString({ message: 'La nueva contraseña es requerida' })
	newPassword?: string;

	@ApiModelProperty({ description: 'Password', type: 'string', })
	@IsString({ message: 'La repeticion de la nueva contraseña es requerida' })
	repitNewPassword?: string;
}
