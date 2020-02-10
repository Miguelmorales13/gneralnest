import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoggerService } from '../helpers/logger/logger.service';

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
		console.log(req);

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
				return { data: data[0] || null, message: data[1] || 'Operacion exitosa' };
			}),
		);
	}
}
