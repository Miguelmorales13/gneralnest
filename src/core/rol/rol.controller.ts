import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { Rol } from '../../entitys/rol.entity';
import { RolService } from './rol.service';

/**
 * Controller api rol
 */
// @UseGuards(AuthGua   rd('jwt'))
@ApiUseTags('Rols')
@Crud({
	model: {
		type: Rol
	}
})
@Controller('rols')
export class RolController {
	constructor(private readonly service: RolService) { }

}
