import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

/**
 * Access
 */
export class AccessDTO {

	@ApiModelProperty({ description: 'access to module dependence' })
	@IsBoolean({ message: 'roles.read_is_required' })
	read?: boolean;

	@ApiModelProperty({ description: 'access to module dependence' })
	@IsBoolean({ message: 'roles.write_is_required' })
	write?: boolean;
}
/**
 * Rol access
 */
export class RolAccessDTO {

	@ApiModelProperty({ description: 'module to access', type: AccessDTO })
	@IsNotEmpty({ message: 'roles.users_is_required' })
	users: AccessDTO;

	@ApiModelProperty({ description: 'module to access', type: AccessDTO })
	@IsNotEmpty({ message: 'roles.roles_is_required' })
	roles: AccessDTO;

	@ApiModelProperty({ description: 'module to access', type: AccessDTO })
	@IsNotEmpty({ message: 'roles.images_is_required' })
	images: AccessDTO;

	@ApiModelProperty({ description: 'module to access', type: AccessDTO })
	@IsNotEmpty({ message: 'roles.categories_images_is_required' })
	categoriesImages: AccessDTO;
}
/**
 * Rol dto
 */
export class RolDTO {

	@ApiModelProperty({ description: 'name to rol', type: 'string' })
	@IsString({ message: 'roles.name_is_required' })
	name?: string;

	@ApiModelProperty({ description: 'access assigned to rol', type: RolAccessDTO })
	@IsNotEmpty({ message: 'roles.access_invalids' })
	access?: RolAccessDTO;
}





