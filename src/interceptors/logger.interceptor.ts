import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as i18n from "i18n";

import { LoggerService } from '../helpers/logger/logger.service';
import { Request } from 'express';

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
	intercept(context: ExecutionContext, call$: CallHandler<any>, ): Observable<any> {
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
				const lang: any = req.headers['accept-language'] || process.env.LANG_DEFAULT;

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
				let message = i18n.__({
					locale: lang,
					phrase: `petitions.${req.method}`
				}, `petitions.${req.method}`)

				return { data: data || null, message: message };
			}),
		);
	}

}
