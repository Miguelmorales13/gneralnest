import { ArgumentsHost, BadGatewayException, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, NotFoundException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import * as i18n from "i18n";
import { LoggerService } from '../helpers/logger/logger.service';


/**
 * Catch HttpErrorFilter implements ExceptionFilter
 */
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
	exceptions: any[] = [
		{ instance: NotFoundException, where: 'NO_FOUND' },
		{ instance: HttpException },
		{ instance: BadGatewayException, where: 'URL' },
	];
    /**
     * Catchs http error filter
     * @param exception Http exception
     * @param host argiment host
     */
	constructor(private readonly _logger: LoggerService) { }
	async catch(exception: HttpException, host: ArgumentsHost) {

		const ctx: HttpArgumentsHost = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();
		// implementacion de angular o vue o react
		// if (exception instanceof HttpException && exception.getStatus() == 404)
		// 	return response.sendFile(
		// 		join(__dirname, '../../public/dist/index.html'),
		// 	);
		const lang: any = request.headers['accept-language'] || process.env.LANG_DEFAULT;

		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

		const wheree: string = exception.message.where || 'SERVER';
		const errorResponce = {
			code: status,
			timestamps: new Date().toLocaleDateString(),
			path: request.url,
			method: request.method,
			message: await this.getMessage(exception.message, lang),
		};
		Logger.error(
			await this._logger.addLoggerInterceptor(
				request,
				Date.now(),
				wheree,
				'ERROR',
				errorResponce,
			),
			exception.stack,
			wheree,
		);

		response.status(status).json(errorResponce);
	}
	async getMessage(error: any, lang: string) {
		if (error && error.error) {
			return await this.traslateMessage(error.error, lang)
		} else if (error) {
			return await this.traslateMessage(error, lang)
		} else {
			return null
		}
	}
	async traslateMessage(message: Array<string> | string, lang: string) {

		if (message instanceof Array) {
			return message.map(messageInArray => {
				return i18n.__({
					locale: lang,
					phrase: messageInArray
				}, messageInArray)
			}).join(', ')
		} else {
			return i18n.__({
				locale: lang,
				phrase: message
			}, message)
		}
	}
}
