import { Controller } from '@nestjs/common';
import { SequelizeCrudController } from '../../crud/SequelizeCrudController';

import { RolDTO } from './rol.dto';
import { RolService } from './rol.service';
import { ApiUseTags } from '@nestjs/swagger';
import { Rol } from '../../entitys/rol.entity';

/**
 * Controller api rol
 */
// @UseGuards(AuthGua   rd('jwt'))

@ApiUseTags('Rols')
@Controller('rols')
export class RolController extends SequelizeCrudController<Rol, RolDTO, RolService> {

	constructor(readonly rols: RolService) {
		super(rols)
	}
}
