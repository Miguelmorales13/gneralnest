import { AbstractRepository, FindOneOptions, ObjectID, ObjectType, FindManyOptions, EntitySchema, DeleteResult, FindConditions, DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from '../entitys/user.entity';

export class GeneralRepository<T> extends AbstractRepository<T>{


	create(entityLikeArray: DeepPartial<T>[]): T[] {
		return this.repository.create(entityLikeArray)
	}
	// this.repo.findAndCount
	findOne(operations?: string | number | Date | ObjectID | FindOneOptions<T>): Promise<T> {
		return this.repository.findOne(this.getWhere(operations))
	}
	findByIds(ids?: any[], operations?: FindManyOptions<T>): Promise<T[]> {
		return this.repository.findByIds(ids, this.getWhere(operations, true))
	}
	find(operations?: FindManyOptions<T>): Promise<T[]> {
		return this.repository.find(this.getWhere(operations, true))
	}
	delete(criteria?: string | number | Date | ObjectID | string[] | number[] | Date[] | ObjectID[] | FindConditions<T>): Promise<DeleteResult> {
		return this.repository.update(criteria, { deletedAt: new Date() } as any)
	}
	update(criteria: string | number | string[] | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<T>, partialEntity: QueryDeepPartialEntity<T>): Promise<DeleteResult> {
		return this.repository.update(criteria, partialEntity)
	}
	private getWhere(operations?: any, whihtWhere: boolean = false) {
		let where = null;
		if (operations && whihtWhere) {
			if (operations.where) {

				switch (typeof operations.where) {
					case "string":
						where = `${operations.where} AND deletedAt = null`

						break;
					case "object":
						if (Array.isArray(operations.where)) {
							where = [
								{
									deletedAt: null,
								},
								...Array(operations.where)
							]
						} else {
							where = {
								deletedAt: null,
								...operations.where

							}
						}
						break;
					default:
						where = {
							deletedAt: null
						}
						break;
				}
			} else {

				where = {
					deletedAt: null
				}
			}
			return { ...operations, where }

		} else {
			return operations
		}
	}
}
