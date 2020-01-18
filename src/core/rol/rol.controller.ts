import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidatorPipe } from '../../pipes/validator.pipe';
import { RolDTO } from './rol.dto';
import { RolService } from './rol.service';

/**
 * Controller api rol
 */
// @UseGuards(AuthGua   rd('jwt'))
@Controller('rol')
export class RolController {
    constructor(private readonly _rols: RolService) { }

    @Get()
    getAll() {
        return this._rols.getAll();
    }
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this._rols.getOne(id);
    }
    @Post()
    create(@Body() rol: RolDTO) {
        return this._rols.created(rol);
    }
    @Put(':id')
    update(@Param('id') id: number, @Body() rol: RolDTO) {
        return this._rols.updated(id, rol);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this._rols.deleted(id);
    }
}
