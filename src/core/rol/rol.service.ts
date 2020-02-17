import { Inject, Injectable } from '@nestjs/common';

import { SequelizeCrudService } from '../../crud/SequelizeCrudService';
import { Rol } from '../../entitys/rol.entity';
import { RolDTO } from './rol.dto';

/**
 * Injectable Rol Service
 */
@Injectable()
export class RolService extends SequelizeCrudService<Rol, RolDTO> {
	constructor(@Inject('ROLS_REPOSITORY') readonly rols: typeof Rol) {
		super(rols)
	}

}
