import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Rol } from './rol.entity';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{name:'Rols',schema:Rol}])],
    providers: [RolService],
    controllers: [RolController],
})
export class RolModule {}
