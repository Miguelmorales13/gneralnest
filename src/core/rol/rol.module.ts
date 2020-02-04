import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from '../../entitys/rol.entity';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';

@Module({
	imports: [TypeOrmModule.forFeature([RolEntity])],
	providers: [RolService],
	controllers: [RolController],
})
export class RolModule { }
