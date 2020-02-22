import { Column, CreatedAt, DeletedAt, Model, UpdatedAt } from 'sequelize-typescript';


export class General<T> extends Model<T> {
	@Column({ autoIncrement: true, primaryKey: true })
	id?: number;

	@CreatedAt
	@Column({ field: 'created_at', allowNull: false })
	createdAt?: Date;

	@UpdatedAt
	@Column({ field: 'updated_at', allowNull: false })
	updatedAt?: Date;

	@DeletedAt
	@Column({ field: 'deleted_at', allowNull: true })
	deletedAt?: Date;
}
