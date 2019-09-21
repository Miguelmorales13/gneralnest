import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
    ForbiddenException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import { METHODS, writeLoggerError } from '../personal-logger/PersonaLogger';

/**
 * Catch HttpErrorFilter implements ExceptionFilter
 */
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    /**
     * Catchs http error filter
     * @param exception Http exception
     * @param host argiment host
     */
    catch(exception: HttpException, host: ArgumentsHost) {
        // Logger.log(JSON.stringify(exception.getStatus()));
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        const where: string = exception.message.where || 'Library o path';
        const errorResponce = {
            code: status,
            timestamps: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: exception.message.error || exception.message || null,
        };
        Logger.error(
            writeLoggerError(
                errorResponce,
                where,
                request.connection.remoteAddress,
            ),
            exception.stack,
            where,
        );

        response.status(status).json(errorResponce);
    }
}
