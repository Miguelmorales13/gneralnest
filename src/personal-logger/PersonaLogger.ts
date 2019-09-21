export type METHODS = 'GET' | 'POST' | 'PUT' | 'DELETE';
import * as fs from 'fs';
import * as moment from 'moment';
import * as path from 'path';
import { Request, Response } from 'express';
const nameApp = process.env.NAME_APP || 'maderas';
const formatLog = 'DD/MM/YYYY HH:mm:ss';
/**
 * Writes logger error
 * @param method  'POST'|'GET'|'PUT'|'DELETE'
 * @param url route
 * @param error message to error
 * @param className exemple (Controller::get)
 * @returns string
 */
export function writeLoggerError(error: any, where: string, ip: string) {
    const logging = `${error.url} ${error.method} [ERROR|${JSON.stringify(
        error,
    )}] `;
    writeFileLog(
        `[${moment().format(
            formatLog,
        )}] [${ip}] [${nameApp}] [${where}] ${logging}`,
    );
    return logging;
}
/**
 * Writes logger error
 * @param method  'POST'|'GET'|'PUT'|'DELETE'
 * @param url route
 * @param error message to error
 * @param className exemple (Controller::get)
 * @returns string
 */
export function writeLogger(
    { method, url, hostname, body }: Request,
    now: number,
    where: string = 'N/A',
    type:string,
    res?: Response
) {
    const logging = `${method} ${url} ${Date.now() -
        now}ms  [ ${type == 'INPUT'?'REQ':'RES'}::${JSON.stringify(type == 'INPUT'?body:res)}]`;
    writeFileLog(
        `[${moment().format(
            formatLog,
        )}] [${hostname}] [${nameApp}] [${type}] [${where}] ${logging}`,
    );
    return logging;
}

export function writeFileLog(logging: string) {
    const date = moment().format('DD-MM-YYYY');
    const url = path.join('src', 'logs', `${date}logging.log`);
    fs.appendFile(url, logging + '\n', (error) => {
        if (error) {
            // tslint:disable-next-line: no-console
            console.log('Error al escribir el log');
            // tslint:disable-next-line: no-console
            console.log(error);
            return false;
        }
        return true;
    });
}
