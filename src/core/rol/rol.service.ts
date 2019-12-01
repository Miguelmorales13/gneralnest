import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {  IRol } from './rol.entity';
import { RolDTO } from './rol.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/**
 * Injectable Rol Service
 */
@Injectable()
export class RolService {
    private service: string = 'RolService';
    /**
     * Creates an instance of rol service.
     * @param repRol
     */
    constructor(
        @InjectModel("Rols")
        private readonly repRol: Model<IRol>,
    ) {}

    /**
     * Gets all
     * @returns all
     */
    async getAll(): Promise<IRol[]> {
        return await this.repRol.find({  deletedAt: null });
    }

    /**
     * Gets one
     * @param id
     * @returns one
     */
    async getOne(_id: string): Promise<IRol> {
        const rol = await this.repRol.findOne({ _id, deletedAt: null });
        if (!rol)
            throw new HttpException(
                {
                    error: 'No se encontro el rol',
                    where: this.service + '::getOne',
                },
                HttpStatus.NOT_FOUND,
            );
        return rol;
    }

    /**
     * Creates rol service
     * @param newRol
     * @returns create
     */
    async created(newRol: Partial<RolDTO>): Promise<IRol> {
        const rol = await this.repRol.create(newRol);
        return rol;
        
    }

    /**
     * Updated rol service
     * @param id
     * @param rol
     * @returns updated
     */
    async updated(_id: string, rol: Partial<RolDTO>): Promise<IRol> {
        const rolUpdated = await this.repRol.findOne({ _id });
        if (!rolUpdated) {
            throw new HttpException(
                {
                    error: 'No se encontro el rol',
                    where: this.service + '::updated',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        await rolUpdated.update( { ...rol })
        return { ...rolUpdated, ...rol } as IRol;
    }

    /**
     * Deletes rol service
     * @param id
     * @returns delete
     */
    async deleted(_id: string): Promise<{ deleted: boolean }> {
        const rol = await this.repRol.findOne({ _id });
        if (!rol)
            throw new HttpException(
                {
                    error: 'No se encontro el rol',
                    where: this.service + '::deleted',
                },
                HttpStatus.NOT_FOUND,
            );
        await rol.update({ deletedAt: new Date() });
        return { deleted: true };
    }
}
