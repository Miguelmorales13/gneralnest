import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

/**
 * User dto
 */
export class UserDTO {
	id?: number
	@ApiModelProperty({ description: 'name to user DTO' })
	@IsString({ message: 'users.name_required' })
	name?: string;

	@ApiModelProperty({ description: 'user to user DTO' })
	// @IsString({ message: 'El usuario es requerido' })
	user?: string;

	@ApiModelProperty({ description: 'email to user DTO' })
	@IsString({ message: 'users.email_required' })
	@IsEmail({}, { message: 'users.format_invalid_email' })
	email?: string;

	// @ApiModelProperty({ description: 'password to user DTO' })
	// @IsString({ message: 'Contraseña requerida' })
	password?: string;

	@ApiModelProperty({ description: 'lastname to user DTO' })
	@IsString({ message: 'users.last_name_required' })
	lastName?: string;

	// @ApiModelProperty({description:'rol to user DTO'})
	// @IsNotEmpty({ message: 'El acceso es requerido' })
	// rol?: RolDTO;
}
