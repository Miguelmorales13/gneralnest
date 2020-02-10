import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../providers/database.module';
import { RolController } from './rol.controller';
import { rolsProviders } from './rol.provider';
import { RolService } from './rol.service';

@Module({
	imports: [DatabaseModule],
	providers: [RolService, ...rolsProviders],
	controllers: [RolController],
})
export class RolModule { }
