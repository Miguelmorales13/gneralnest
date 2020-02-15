import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { generateStorageMulter } from '../../config/constants';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { Crud } from '@nestjsx/crud';
import { User } from '../../entitys/user.entity';

/**
 * Controller users
 */
// @UseGuards(AuthGuard('jwt'))
@Crud({
	model: {
		type: User
	}
})
@Controller('users')
export class UserController {
	constructor(public _users: UserService) { }
	@Post('photo')
	@UseInterceptors(
		FilesInterceptor('photo', 1, generateStorageMulter('images')),
	)
	async uploadPhoto(@UploadedFiles() files) {
		return { yes: files };
	}

}
