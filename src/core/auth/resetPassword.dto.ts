import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ResetPassowordDTO {
	@ApiModelProperty({
		description: 'Email to reset password',
		type: 'string',
	})
	@IsString({ message: 'El usuario es requerido' })
	@IsEmail({}, { message: 'El formato del correo no es valido' })
	email?: string;
}
