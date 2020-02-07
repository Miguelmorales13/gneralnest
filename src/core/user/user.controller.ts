import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

import { UserEntity } from '../../entitys/user.entity';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

/**
 * Controller users
 */
// @UseGuards(AuthGuard('jwt'))
@Crud({
	model: {
		type: UserEntity,
	},
	dto: {
		create: UserDTO,
		update: UserDTO,
		replace: UserDTO
	},
	validation: {

	}
})
@Controller('users')
export class UserController {
	constructor(private readonly service: UserService) { }

}
