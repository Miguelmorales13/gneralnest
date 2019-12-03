import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Rol, RolEnum } from './user.entity';

/**
 * User dto
 */
export class UserDTO {

    @ApiModelProperty({description:'name to user DTO'})
    @IsString({ message: 'El nombre es una cadena' })
    name?: string;
    
    @ApiModelProperty({description:'user to user DTO'})
    @IsString({ message: 'El usuario es requerido' })
    user?: string;
    
    @ApiModelProperty({description:'email to user DTO'})
    @IsEmail({}, { message: 'Verifica que tu correo sea valido' })
    @IsString({ message: 'El correo es requerido' })
    email?: string;
    
    @ApiModelProperty({description:'password to user DTO'})
    @IsString({ message: 'Contraseña requerida' })
    password?: string;
    
    @ApiModelProperty({description:'lastname to user DTO'})
    @IsString({ message: 'el apellido es requerido' })
    lastName?: string;
    
    @ApiModelProperty({description:'rol to user DTO'})
    @IsEnum(RolEnum,{ message: 'El rol es requerido' })
    _rol?: Rol;
}
