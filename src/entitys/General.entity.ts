
import { PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, Model, Column, DataType, IsUUID } from 'sequelize-typescript';

export class General<T> extends Model<T> {
	@Column({ autoIncrement: true, primaryKey: true })
	id?: number;

	@CreatedAt
	@Column
	createdAt?: Date;

	@UpdatedAt
	@Column
	updatedAt?: Date;

	@DeletedAt
	@Column
	deletedAt?: Date;
}
