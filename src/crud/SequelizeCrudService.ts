import { Inject } from "@nestjs/common";
import { ICrudService } from './ISequelizeCrudService';
import { Model } from 'sequelize-typescript';



export class SequelizeCrudService<T = any, D = any> implements ICrudService<T, D> {
	constructor(private readonly service: T | any) { }

	async getAll(): Promise<T[]> {
		return await this.service.findAll()
	}
	async getOne(id: number): Promise<T> {
		return await this.service.findByPk(id)
	}

	async create(item: Partial<D>): Promise<T> {

		let itemCreated = await this.service.create(item)
		return itemCreated;
	}
	async createBulk(item: Partial<D[]>): Promise<T[]> {
		let itemsCreated = await this.service.bulkCreate(item)
		return itemsCreated
	}
	async update(item: Partial<D>, id: number): Promise<T> {
		await this.service.update(item, { where: { id }, limit: 1 })
		return await this.getOne(id)
	}
	async delete(id: number): Promise<number> {
		return this.service.destroy({ where: { id }, limit: 1 })
	}
}
