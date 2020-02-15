import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { RolDTO } from './rol.dto';
import { RolService } from './rol.service';

/**
 * Controller api rol
 */
// @UseGuards(AuthGua   rd('jwt'))
@Controller('rols')
export class RolController {

	constructor(private readonly _rols: RolService) { }
	@Get()
	async getAll() {
		let result = await this._rols.getAll()
		return [result]
	}
	@Get(':id')
	async getById(@Param(':id') id: number) {
		let result = await this._rols.getOne(id)
		return [result, result ? 'No se encontro el registro' : null]
	}
	@Post()
	async create(@Body() rol: RolDTO) {
		let result = await this._rols.create(rol)
		return [result, `Creacion de rol exitosa con el id ${result.id}`]
	}
	@Put(':id')
	async update(@Body() rol: RolDTO, @Param('id') id: number) {
		let result = await this._rols.update(rol, id)
		return [result, `Actualizacion de rol exitosa`]
	}
	@Delete(':id')
	async delete(@Param('id') id: number) {
		let result = await this._rols.delete(id)
		return [result, 'Eliminacion de usaurio exitosa']
	}
}
