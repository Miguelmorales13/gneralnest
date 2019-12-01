import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Rol dto
 */
export class RolDTO {

    @ApiModelProperty({description: 'name to rol', type:'string' })
    @IsString({ message: 'El nombre es requerido' })
    name?: string;
    
    @ApiModelProperty({description: 'access assigned to rol' })
    @IsNotEmpty({ message: 'accessos invalidos' })
    access?: any;
}

/**
 * Access
 */
export class AccessDTO {

    @ApiModelProperty({description:'access to module dependence ', type:'boolean'})
    @IsBoolean({ message: 'accessos de lectura invalidos' })
    read?: boolean;
    
    @ApiModelProperty({description:'access to module dependence ', type:'boolean'})
    @IsBoolean({ message: 'accessos de escritura invalidos' })
    write?: boolean;
}

/**
 * Rol access
 */
export class RolAccessDTO {

    @ApiModelProperty({description: 'module to access'})
    @IsNotEmpty({ message: 'accessos de usuarios invalidos' })
    users: AccessDTO;

    @ApiModelProperty({description: 'module to access'})
    @IsNotEmpty({ message: 'accessos de roles invalidos' })
    rols: AccessDTO;
}
