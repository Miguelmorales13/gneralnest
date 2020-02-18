import { Column, CreateDateColumn, Exclusion, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiModelPropertyOptional, ApiOkResponse, ApiImplicitFile } from '@nestjs/swagger';
import { IsDate, IsDateString, IsOptional, IsNumber } from 'class-validator';
import { isNumber } from 'util';

@Exclusion(`deletedAt = null`)
export abstract class Generar {

	@ApiModelPropertyOptional({ description: 'user to user DTO' })
	@PrimaryGeneratedColumn()
	// @IsNumber()
	@IsOptional()
	id: number;

	@ApiModelPropertyOptional({ description: 'user to user DTO' })
	// @IsDateString()
	@CreateDateColumn()
	@IsOptional()
	createdAt: Date;

	@ApiModelPropertyOptional({ description: 'user to user DTO' })
	// @IsDateString()
	@UpdateDateColumn()
	@IsOptional()
	updatedAt: Date;

	@ApiModelPropertyOptional({ description: 'user to user DTO' })
	// @IsDateString()
	@IsOptional()
	@Column({ nullable: true })
	deletedAt?: Date;
}
