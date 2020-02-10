import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

import { Rol } from '../../entitys/rol.entity';
import { RolDTO } from './rol.dto';
import { RolService } from './rol.service';

/**
 * Controller api rol
 */
// @UseGuards(AuthGua   rd('jwt'))
@Controller('rols')
export class RolController {
	constructor(private readonly _rol: RolService) { }

}
