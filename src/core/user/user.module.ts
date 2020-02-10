import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entitys/user.entity';
import { DatabaseModule } from '../../providers/database.module';
import { usersProviders } from './user.provider';
@Module({
	imports: [DatabaseModule],
	providers: [UserService, ...usersProviders],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule { }
