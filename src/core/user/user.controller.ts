import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req, Request } from '@nestjs/common';
import { ApiConsumes, ApiUseTags } from '@nestjs/swagger';

import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

/**
 * Controller users
 */
@ApiUseTags('Users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
	attributes = ['id', 'name', 'lastName', 'createdAt', 'updatedAt', 'rolId', 'user', 'email', 'active']
	constructor(private readonly users: UserService) { }

	@Get()
	async getAll() {
		// async getAll(@Req() req: Request) {

		let data = await this.users.getAll({ attributes: this.attributes })
		return data
	}
	@Get(':id')
	async getById(@Param('id') id: number) {
		let data = await this.users.getOne(id, { attributes: this.attributes })
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
