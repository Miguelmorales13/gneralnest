import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RolDTO } from './rol.dto';
import { RolService } from './rol.service';
import { Crud } from '@nestjsx/crud';
import { Rol } from '../../entitys/rol.entity';

/**
 * Controller api rol
 */
// @UseGuards(AuthGua   rd('jwt'))
@Crud({
	model: {
		type: Rol
	}
})
@Controller('rols')
export class RolController {
	constructor(private readonly _rols: RolService) { }

}
