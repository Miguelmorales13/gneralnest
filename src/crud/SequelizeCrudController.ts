import { Body, Post, Put, Delete, Get, Param } from '@nestjs/common';
import { ICrudService } from './ISequelizeCrudService';
import { General } from '../entitys/General.entity';




export class SequelizeCrudController<T = any, D = any, S extends ICrudService<T, D> = any>{
	constructor(private readonly service: S) { }

	@Get()
	async getAll() {
		let data = await this.service.getAll()
		return { data, message: '' }
	}
	@Get(':id')
	async getById(@Param(':id') id: number) {
		let data = await this.service.getOne(id)
		return { data, message: data ? 'No se encontro el registro' : null }
	}
	@Post()
	async create(@Body() user: D) {
		let data = await this.service.create(user)
		return { data, message: `Creacion exitosa` }
	}
	@Put(':id')
	async update(@Body() user: D, @Param('id') id: number) {
		let data = await this.service.update(user, id)
		return { data, message: `Actualizacion exitosa` }
	}
	@Delete(':id')
	async delete(@Param('id') id: number) {
		let data = await this.service.delete(id)
		return { data, message: 'Eliminacion exitosa' }
	}
}
