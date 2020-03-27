import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

/**
 * Rol dto
 */
export class RolDTO {

	@ApiModelProperty({ description: 'name to rol', type: 'string' })
	@IsString({ message: 'The name is required' })
	name?: string;

	@ApiModelProperty({ description: 'access assigned to rol' })
	@IsNotEmpty({ message: 'access invalids' })
	access?: number | AccessDTO;
}

/**
 * Access
 */
export class AccessDTO {

	@ApiModelProperty({ description: 'access to module dependence ', type: 'boolean' })
	@IsBoolean({ message: 'access to read invalids' })
	read?: boolean;

	@ApiModelProperty({ description: 'access to module dependence ', type: 'boolean' })
	@IsBoolean({ message: 'access to write invalids' })
	write?: boolean;
}

/**
 * Rol access
 */
export class RolAccessDTO {

	@ApiModelProperty({ description: 'module to access' })
	@IsNotEmpty({ message: 'access to users invalids' })
	users: AccessDTO;

	@ApiModelProperty({ description: 'module to access' })
	@IsNotEmpty({ message: 'accesses to roles invalids' })
	roles: AccessDTO;
}
