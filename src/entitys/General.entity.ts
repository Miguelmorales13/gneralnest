import { Column, CreateDateColumn, Exclusion, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Exclusion(`"deletedAt" is not null`)
export abstract class Generar {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ nullable: true })
	deletedAt?: Date;
}
