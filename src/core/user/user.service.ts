import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { User } from '../../entitys/user.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

/**
 * Injectable
 * UserService
 */
@Injectable()
export class UserService extends TypeOrmCrudService<User>{
	/**
	 * Creates an instance of user service.
	 * @param repUser
	 */
	constructor(@InjectRepository(User) repo) {
		super(repo);
	}

	async getByUser(user: string): Promise<User> {
		return await this.repo.findOne({
			where: `user  = '${user}' OR email = '${user}'`
		})
	}



}
