import { Inject, Injectable } from '@nestjs/common';

import { Rol } from '../../entitys/rol.entity';
import { RolDTO } from './rol.dto';

/**
 * Injectable Rol Service
 */
@Injectable()
export class RolService {
	constructor(@Inject('ROLS_REPOSITORY') private readonly rols: typeof Rol) { }


	async getAll(): Promise<Rol[]> {
		return await this.rols.findAll()
	}
	async getOne(id: number): Promise<Rol> {
		return await this.rols.findByPk(id)
	}

	async create(rol: Partial<RolDTO>): Promise<Rol> {
		let rolCreated = await this.rols.create(rol)
		return rolCreated;
	}
	async createBulk(rols: Partial<RolDTO[]>) {
		let rolsCreated = await this.rols.bulkCreate(rols)
		return rolsCreated
	}
	async update(rol: Partial<RolDTO>, id: number) {
		this.rols.update(rol, { where: { id }, limit: 1 })
	}
	async delete(id: number) {
		this.rols.destroy({ where: { id }, limit: 1 })
	}

}
