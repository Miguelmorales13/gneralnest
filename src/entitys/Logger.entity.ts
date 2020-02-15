import * as bcrypt from 'bcrypt';
import { Column, Entity, BeforeInsert } from 'typeorm';
import { Generar } from './General.entity';
import * as moment from 'moment';
/**
 * Entity logger
 */
@Entity()
export class Logger extends Generar {
	@Column({ length: 100 })
	url: string;

	@Column({ type: 'enum', enum: ['REQUEST', 'RESPONSE', 'ERROR', 'SERVICE'] })
	type: string;

	@Column({ length: 100 })
	method: string;

	@Column({ type: 'bigint' })
	now: number;

	@Column({ length: 500 })
	result: string;

	@Column()
	where: string;

	@BeforeInsert()
	recortMessage() {
		this.result =
			this.result.length > 500 ? this.result.substr(0, 500) : this.result;
	}
	_toString(): string {
		return `${this.method} ${this.url} ${Date.now() - this.now}ms [${
			this.type
			}::${this.result}]`;
	}
}
