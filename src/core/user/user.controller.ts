import { Controller, Get, Put, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiUseTags, ApiImplicitBody, ApiConsumes } from '@nestjs/swagger';

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
export class UserController {
	constructor(private readonly users: UserService) { }

	@Get()
	@ApiConsumes('cosas')
	async getAll() {
		let data = await this.users.getAll()
		return { data, message: '' }
	}
	@Get(':id')
	async getById(@Param(':id') id: number) {
		let data = await this.users.getOne(id)
		return { data, message: data ? 'No se encontro el registro' : null }
	}

	@Post()
	async create(@Body() user: UserDTO) {
		let data = await this.users.create(user)
		return { data, message: `Creacion exitosa` }
	}
	@Put(':id')
	async update(@Body() user: UserDTO, @Param('id') id: number) {
		let data = await this.users.update(user, id)
		return { data, message: `Actualizacion exitosa` }
	}
	@Delete(':id')
	async delete(@Param('id') id: number) {
		let data = await this.users.delete(id)
		return { data, message: 'Eliminacion exitosa' }
	}

}
