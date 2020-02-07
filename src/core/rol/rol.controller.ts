import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RolDTO } from './rol.dto';
import { RolService } from './rol.service';
import { Rol } from '../../entitys/rol.entity';
import { Crud } from '@nestjsx/crud';

/**
 * Controller api rol
 */
// @UseGuards(AuthGua   rd('jwt'))
@Crud({
	model: {
		type: Rol,
	},
	dto: {
		create: RolDTO,
		update: RolDTO,
		replace: RolDTO
	},
})
@Controller('rol')
export class RolController {
	constructor(private readonly service: RolService) { }

}
