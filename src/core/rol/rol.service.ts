import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolEntity } from '../../entitys/rol.entity';
import { RolDTO } from './rol.dto';

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
        @InjectRepository(RolEntity)
        private readonly repRol: Repository<RolEntity>,
    ) {}

    /**
     * Gets all
     * @returns all
     */
    async getAll(): Promise<RolEntity[]> {
        return await this.repRol.find({ where: { deletedAt: null } });
    }

    /**
     * Gets one
     * @param id
     * @returns one
     */
    async getOne(id: number): Promise<RolEntity> {
        const rol = await this.repRol.findOne({ id, deletedAt: null });
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
    async created(newRol: Partial<RolDTO>): Promise<RolEntity> {
        const rol = await this.repRol.create(newRol);
        await this.repRol.save(rol);
        return rol;
    }

    /**
     * Updated rol service
     * @param id
     * @param rol
     * @returns updated
     */
    async updated(id: number, rol: Partial<RolDTO>): Promise<RolEntity> {
        const rolUpdated = await this.repRol.findOne({ id });
        if (!rolUpdated) {
            throw new HttpException(
                {
                    error: 'No se encontro el rol',
                    where: this.service + '::updated',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        await this.repRol.update({ id }, { ...rol });
        return { ...rolUpdated, ...rol };
    }

    /**
     * Deletes rol service
     * @param id
     * @returns delete
     */
    async deleted(id: number): Promise<{ deleted: boolean }> {
        const rol = await this.repRol.findOne({ id });
        if (!rol)
            throw new HttpException(
                {
                    error: 'No se encontro el rol',
                    where: this.service + '::deleted',
                },
                HttpStatus.NOT_FOUND,
            );
        await this.repRol.update({ id }, { deletedAt: new Date() });
        return { deleted: true };
    }
}
