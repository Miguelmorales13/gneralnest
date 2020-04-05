import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { RolDTO } from './rol.dto';
import { RolService } from './rol.service';
import { AuthGuard } from '@nestjs/passport';

/**
 * Controller api rol
 */
// @UseGuards(AuthGua   rd('jwt'))

@ApiUseTags('Roles')
@Controller('roles')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class RolController {

	constructor(readonly roles: RolService) {
	}
	@Get()
	async getAll() {
		let data = await this.roles.getAll()
		return data
	}
	@Get(':id')
	async getById(@Param('id') id: number) {
		let data = await this.roles.getOne(id)
		return data
	}

	@Post()
	async create(@Body() rol: RolDTO) {
		let data = await this.roles.create(rol)
		return data
	}
	@Put(':id')
	async update(@Body() rol: RolDTO, @Param('id') id: number) {
		let data = await this.roles.update(rol, id)
		return data
	}
	@Delete(':id')
	async delete(@Param('id') id: number) {
		let data = await this.roles.delete(id)
		return data
	}
}
