import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import * as fs from 'fs';
import * as moment from 'moment';
import * as path from 'path';
import { Repository } from 'typeorm';
import { ConfigService } from '../../config/config.service';
import { Logger } from '../../entitys/Logger.entity';
import { GateLoggerGateway } from './gate-logger.gateway';

@Injectable()
export class LoggerService {
	constructor(
		@InjectRepository(Logger)
		private readonly repLog: Repository<Logger>,
		private readonly _config: ConfigService,
		private readonly _gateLog: GateLoggerGateway,
	) { }

	async getLogs() {
		return await this.repLog.find({
			where: { deletedAt: null },
			take: 1000,
			order: { createdAt: 'DESC' },
		});
	}

	async addLoggerInterceptor(
		{ method, url }: Request,
		now: number,
		where: string,
		type: TypeLogger,
		result: object,
	): Promise<any> {
		const logger = await this.repLog.create({
			url,
			type,
			now,
			where,
			method,
			result: JSON.stringify(result),
		});
		await this.repLog.save(logger);
		if (this._config.get('LOGS_WRITE')) {
			this.writeLogger(logger);
		}
		this._gateLog.sendLog(await logger._toString());
		return await logger._toString();
	}
	async writeLogger(logger: Logger) {
		const date = moment().format('DD-MM-YYYY');
		const url = path.join(
			__dirname,
			'../../../',
			this._config.get('URL_LOGS'),
			`${date}-logging.log`,
		);
		fs.appendFile(
			url,
			`[${moment(logger.createdAt).format('DD-MM-YYYY HH:MM:SS')}] [${
			logger.where
			}] ${logger._toString()}` + '\n',
			(error) => {
				if (error) {
					console.log('Error al escribir el log');
					console.log(error);
					return false;
				}
				return true;
			},
		);
	}
}
export type TypeLogger = 'REQUEST' | 'RESPONSE' | 'ERROR' | 'SERVICE';
