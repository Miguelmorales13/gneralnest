import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { SequelizeCrudController } from '../../crud/SequelizeCrudController';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { User } from '../../entitys/user.entity';

/**
 * Controller users
 */
// @UseGuards(AuthGuard('jwt'))
@ApiUseTags('Users')
@Controller('users')
export class UserController extends SequelizeCrudController<User, UserDTO, UserService> {
	constructor(private readonly users: UserService) {
		super(users)
	}

}
