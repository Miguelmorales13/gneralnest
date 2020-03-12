import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req, Request } from '@nestjs/common';
import { ApiConsumes, ApiUseTags } from '@nestjs/swagger';

import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../entitys/user.entity';

/**
 * Controller users
 */
@ApiUseTags('Users')
@Controller('users')
// @UseGuards(AuthGuard('jwt'))
export class UserController {
	attributes = ['id', 'name', 'lastName', 'createdAt', 'updatedAt', 'rolId', 'user', 'email', 'active']
	constructor(private readonly users: UserService) { }

	/**
	 * Gets all
	 * @returns all
	 */
	@Get()
	async getAll(): Promise<User[]> {
		// async getAll(@Req() req: Request) {
		let data = await this.users.getAll({ attributes: this.attributes })
		return data
	}
	/**
	 * Gets by id
	 * @param id
	 * @returns by id
	 */
	@Get(':id')
	async getById(@Param('id') id: number): Promise<User> {
		return await this.users.getOne(id, { attributes: this.attributes })
	}

	/**
	 * Creates user controller
	 * @param user
	 * @returns create
	 */
	@Post()
	async create(@Body() user: UserDTO): Promise<User> {
		return await this.users.create(user)
	}
	/**
	 * Updates user controller
	 * @param user
	 * @param id
	 * @returns update
	 */
	@Put(':id')
	async update(@Body() user: UserDTO, @Param('id') id: number): Promise<User> {
		return await this.users.update(user, id)
	}
	/**
	 * Deletes user controller
	 * @param id
	 * @returns delete
	 */
	@Delete(':id')
	async delete(@Param('id') id: number): Promise<number> {
		return await this.users.delete(id)
	}

}
