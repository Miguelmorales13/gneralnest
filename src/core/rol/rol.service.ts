import { Inject, Injectable } from '@nestjs/common';
import { SequelizeCrudService } from '../../crud/SequelizeCrudService';
import { Rol } from '../../entities/rol.entity';
import { RolDTO } from './rol.dto';


/**
 * Injectable Rol Service
 */
@Injectable()
export class RolService extends SequelizeCrudService<Rol, RolDTO> {
	constructor(@Inject('ROLES_REPOSITORY') readonly roles: typeof Rol) {
		super(roles)
	}

}
