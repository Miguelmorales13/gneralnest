import { Controller, Body, Param, Put, Post, Get, Delete } from '@nestjs/common';
import { SequelizeCrudController } from '../../crud/SequelizeCrudController';

import { RolDTO } from './rol.dto';
import { RolService } from './rol.service';
import { ApiUseTags } from '@nestjs/swagger';
import { Rol } from '../../entitys/rol.entity';

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
		return { data, message: '' }
	}
	@Get(':id')
	async getById(@Param(':id') id: number) {
		let data = await this.rols.getOne(id)
		return { data, message: data ? 'No se encontro el registro' : null }
	}

	@Post()
	async create(@Body() rol: RolDTO) {
		let data = await this.rols.create(rol)
		return { data, message: `Creacion exitosa` }
	}
	@Put(':id')
	async update(@Body() rol: RolDTO, @Param('id') id: number) {
		let data = await this.rols.update(rol, id)
		return { data, message: `Actualizacion exitosa` }
	}
	@Delete(':id')
	async delete(@Param('id') id: number) {
		let data = await this.rols.delete(id)
		return { data, message: 'Eliminacion exitosa' }
	}
}
