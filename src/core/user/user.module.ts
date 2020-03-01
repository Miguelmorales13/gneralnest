import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../providers/database.module';
import { UserController } from './user.controller';
import { usersProviders } from './user.provider';
import { UserService } from './user.service';
import { HelpersModule } from '../../helpers/helpers.module';
import { ConfigModule } from '../../config/config.module';

@Module({
	imports: [DatabaseModule, HelpersModule, ConfigModule],
	providers: [UserService, ...usersProviders],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule { }
