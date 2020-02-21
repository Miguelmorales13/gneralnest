import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../providers/database.module';
import { UserController } from './user.controller';
import { usersProviders } from './user.provider';
import { UserService } from './user.service';

@Module({
	imports: [DatabaseModule],
	providers: [UserService, ...usersProviders],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule { }
