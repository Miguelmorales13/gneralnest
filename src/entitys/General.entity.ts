import { Column, CreateDateColumn, Exclusion, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiModelPropertyOptional, ApiOkResponse, ApiImplicitFile } from '@nestjs/swagger';
import { IsDate, IsDateString, IsOptional, IsNumber } from 'class-validator';
import { isNumber } from 'util';

@Exclusion(`"deletedAt" is not null`)
export abstract class Generar {

	@ApiModelPropertyOptional({ description: 'user to user DTO' })
	@PrimaryGeneratedColumn()
	@IsNumber()
	@IsOptional({ always: true })
	id: number;

	@ApiModelPropertyOptional({ description: 'user to user DTO' })
	@IsDateString()
	@IsOptional({ always: true })
	@CreateDateColumn()
	createdAt: Date;

	@ApiModelPropertyOptional({ description: 'user to user DTO' })
	@IsDateString()
	@UpdateDateColumn()
	@IsOptional({ always: true })
	updatedAt: Date;

	@ApiModelPropertyOptional({ description: 'user to user DTO' })
	@IsDateString()
	@IsOptional({ always: true })
	@Column({ nullable: true })
	deletedAt?: Date;
}
