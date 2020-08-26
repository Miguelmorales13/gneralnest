import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { LoggerService } from '../helpers/logger/logger.service';
import * as  uuid from 'uuid/v4';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	constructor(private readonly _logger: LoggerService) { }
	async use(req: Request, res: Response, next: Function) {
		req['uuid'] = uuid()
		req['time'] = Date.now()
		await Logger.log(
			await this._logger.addLoggerInterceptor(
				req as any,
				Date.now(),
				'Entry',
				'REQUEST',
				req.body,
			),
		)
		next();
	}
}
