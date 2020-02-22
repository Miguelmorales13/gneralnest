import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiConsumes, ApiUseTags } from '@nestjs/swagger';

import { UserDTO } from './user.dto';
import { UserService } from './user.service';

/**
 * Controller users
 */
// @UseGuards(AuthGuard('jwt'))
@ApiUseTags('Users')
@Controller('users')
export class UserController {
	constructor(private readonly users: UserService) { }

	@Get()
	@ApiConsumes('cosas')
	async getAll() {
		let data = await this.users.getAll()
		return data
	}
	@Get(':id')
	async getById(@Param('id') id: number) {
		let data = await this.users.getOne(id)
		return data
	}

	@Post()
	async create(@Body() user: UserDTO) {
		let data = await this.users.create(user)
		return data
	}
	@Put(':id')
	async update(@Body() user: UserDTO, @Param('id') id: number) {
		let data = await this.users.update(user, id)
		return data
	}
	@Delete(':id')
	async delete(@Param('id') id: number) {
		let data = await this.users.delete(id)
		return data
	}

}
