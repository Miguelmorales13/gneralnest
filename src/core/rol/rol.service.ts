import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Rol } from '../../entitys/rol.entity';

/**
 * Injectable Rol Service
 */
@Injectable()
export class RolService extends TypeOrmCrudService<Rol> {
	constructor(@InjectRepository(Rol) repo) {
		super(repo);
	}
}
