import { ICrudService } from './ISequelizeCrudService';
import { FindOptions } from 'sequelize';



/**
 * Sequelize crud service
 * @template T
 * @template D
 */
export abstract class SequelizeCrudService<T = any, D = any> implements ICrudService<T, D> {
	constructor(private readonly service: T | any) { }

	async getAll(options?: FindOptions): Promise<T[]> {
		return await this.service.findAll(options || null)
	}
	async getOne(id: number, options?: FindOptions): Promise<T> {
		return await this.service.findByPk(id, options)
	}
	async create(item: Partial<D>): Promise<T> {
		let itemCreated = await this.service.create(item)
		return this.getOne(itemCreated.id);
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
