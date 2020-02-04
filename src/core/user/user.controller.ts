import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { generateStorageMulter } from '../../config/constants';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

/**
 * Controller users
 */
// @UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
	constructor(private readonly _users: UserService) { }

	/**
	 * Gets user controller
	 * @returns  users[]
	 */
	@Get()
	getAll() {
		return this._users.getAll();
	}
	/**
	 * Gets user controller
	 * @param id by user
	 * @returns  user
	 */
	@Get(':id')
	getOne(@Param('id') id: number) {
		return this._users.getOne(id);
	}
	/**
	 * Posts user controller
	 * @param user to new user
	 * @returns  new user
	 */
	@Post()
	create(@Body() user: UserDTO) {
		return this._users.created(user as UserDTO);
	}
	/**
	 * Posts user controller
	 * @param user to new user
	 * @returns  new user
	 */
	@Post('photo')
	@UseInterceptors(
		FilesInterceptor('photo', 1, generateStorageMulter('images')),
	)
	async uploadPhoto(@UploadedFiles() files) {
		return { yes: files };
	}
	/**
	 * Puts user controller
	 * @param id  by user
	 * @param user params to new user
	 * @returns  user updated
	 */
	@Put(':id')
	update(@Param('id') id: number, @Body() user: UserDTO) {
		return this._users.updated(id, user as UserDTO);
	}

	/**
	 * Deletes user controller
	 * @param id
	 * @returns
	 */
	@Delete(':id')
	delete(@Param('id') id: number) {
		return this._users.deleted(id);
	}
}
