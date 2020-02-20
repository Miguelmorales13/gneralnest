import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor, HttpStatus, RequestMethod, Request } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoggerService } from '../helpers/logger/logger.service';
import { messageReposponse } from '../config/constants';

/**
 * Injectable
 */
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    /**
     * Intercepts logger interceptor
     * @param context context
     * @param call$ interceptor
     * @returns intercept call$
     */
	constructor(private readonly _logger: LoggerService) { }
	intercept(
		context: ExecutionContext,
		call$: CallHandler<any>,
	): Observable<any> {
		const req = context.switchToHttp().getRequest<Request>();
		const wheree = context.getClass().name + '::' + context.getHandler().name;
		const now = Date.now();
		return call$.handle().pipe(
			tap(async () => {
				Logger.log(
					await this._logger.addLoggerInterceptor(
						req,
						now,
						wheree,
						'REQUEST',
						req.body,
					),
					wheree,
				);
			}),
			map(async (data) => {
				Logger.log(
					await this._logger.addLoggerInterceptor(
						req,
						now,
						wheree,
						'RESPONSE',
						data,
					),
					wheree,
				);
				return { data: data.data || null, message: messageReposponse(req.method) };
			}),
		);
	}

}
