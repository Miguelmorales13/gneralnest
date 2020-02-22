import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { RolDTO } from './rol.dto';
import { RolService } from './rol.service';

/**
 * Controller api rol
 */
// @UseGuards(AuthGua   rd('jwt'))

@ApiUseTags('Rols')
@Controller('rols')
export class RolController {

	constructor(readonly rols: RolService) {
	}
	@Get()
	async getAll() {
		let data = await this.rols.getAll()
		return data
	}
	@Get(':id')
	async getById(@Param('id') id: number) {
		let data = await this.rols.getOne(id)
		return data
	}

	@Post()
	async create(@Body() rol: RolDTO) {
		let data = await this.rols.create(rol)
		return data
	}
	@Put(':id')
	async update(@Body() rol: RolDTO, @Param('id') id: number) {
		let data = await this.rols.update(rol, id)
		return data
	}
	@Delete(':id')
	async delete(@Param('id') id: number) {
		let data = await this.rols.delete(id)
		return data
	}
}
