import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { HelpersModule } from '../../helpers/helpers.module';
import { DatabaseModule } from '../../providers/database.module';
import { UserController } from './user.controller';
import { usersProviders, tesProvidersMongo } from './user.provider';
import { UserService } from './user.service';

@Module({
	imports: [DatabaseModule, HelpersModule, ConfigModule],
	providers: [UserService, ...usersProviders, ...tesProvidersMongo],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule { }
