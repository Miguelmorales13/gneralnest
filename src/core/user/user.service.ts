import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { UserEntity } from '../../entitys/user.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

/**
 * Injectable
 * UserService
 */
@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
	constructor(@InjectRepository(UserEntity) repo) {
		super(repo);
	}
}
