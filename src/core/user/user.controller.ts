import { Controller, Get, Param, Body, Post, Delete, Put } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

import { User } from '../../entitys/user.entity';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { usersProviders } from './user.provider';

/**
 * Controller users
 */
// @UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
	constructor(private readonly _users: UserService) { }
	@Get()
	async getAll() {
		let result = await this._users.getAll()
		return [result]
	}
	@Get(':id')
	async getById(@Param(':id') id: number) {
		let result = await this._users.getOne(id)
		return [result, result ? 'No se encontro el registro' : null]
	}
	@Post()
	async create(@Body() user: UserDTO) {
		let result = await this._users.create(user)
		return [result, `Creacion de usuario exitosa con el id ${result.id}`]
	}
	@Put(':id')
	async update(@Body() user: UserDTO, @Param('id') id: number) {
		let result = await this._users.update(user, id)
		return [result, `Actualizacion de usuario exitosa`]
	}
	@Delete(':id')
	async delete(@Param('id') id: number) {
		let result = await this._users.delete(id)
		return [result, 'Eliminacion de usaurio exitosa']
	}
}
