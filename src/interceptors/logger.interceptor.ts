import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { METHODS, writeLogger } from '../personal-logger/PersonaLogger';

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
    intercept(
        context: ExecutionContext,
        call$: CallHandler<any>,
    ): Observable<any> {
        const req = context.switchToHttp().getRequest<Request>();
        const where =
            context.getClass().name + '::' + context.getHandler().name;
        const now = Date.now();
        return call$.handle().pipe(
            tap(() => {
                Logger.log(writeLogger(req, now, where,'INPUT'), where);
            }),
            map(data=>{
                Logger.log(writeLogger(req, now, where,'OUTPUT',data), where);
                return data
            })
        );
    }
}
