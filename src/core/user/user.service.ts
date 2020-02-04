import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { UserEntity } from '../../entitys/user.entity';

/**
 * Injectable
 * UserService
 */
@Injectable()
export class UserService {
	private service: string = 'UserService';
	/**
	 * Creates an instance of user service.
	 * @param repUser
	 */
	constructor(
		@InjectRepository(UserEntity)
		private readonly repUser: Repository<UserEntity>,
	) { }

	/**
	 * Gets all users
	 * @returns {Promise<UserEntity[]>} users un database
	 */
	async getAll(): Promise<UserEntity[]> {
		return await this.repUser.find({
			where: {},
			// relations: ['rol'],
		});
	}

	/**
	 * Gets one user
	 * @param {number} id  key  to user serched
	 * @returns {Promise<UserEntity>} user serched
	 */
	async getOne(id: number): Promise<UserEntity> {
		const user = await this.repUser.findOne(
			{ id, deletedAt: null },
			// { relations: ['rol'] },
		);
		if (!user) {
			throw new HttpException(
				{
					error: 'No se encontro el usuario',
					where: this.service + '::getOne',
				},
				HttpStatus.NOT_FOUND,
			);
		}
		return user;
	}

	/**
	 * Gets one by user and password
	 * @param user user
	 * @returns one by user and password
	 */
	async getOneByUser(user: string): Promise<UserEntity> {
		const userFinded = await this.repUser.findOne({
			where: `user = '${user}' OR email = '${user}'`,
			// relations: ['rol'],
		});
		return userFinded;
	}

	/**
	 * Creates user service
	 * @param {UserDTO} newUser data to create new user
	 * @returns  { Promise<UserEntity>} user created
	 */
	async created(newUser: Partial<UserDTO>): Promise<UserEntity> {
		const user = await this.repUser.create(newUser as UserEntity);
		await this.repUser.save(user);
		return await this.repUser.findOne({
			where: {
				id: user.id,
			},
			// relations: ['rol'],
		});
	}

	/**
	 * Updated user service
	 * @param {number} id key to user update
	 * @param  {UserDTO} user new data for user updated
	 * @returns {Promise<UserDTO[]>} user updated
	 */
	async updated(id: number, user: Partial<UserDTO>): Promise<UserEntity> {
		const userUpdated = await this.repUser.findOne(
			{ id },
			// { relations: ['rol'] },
		);
		if (!userUpdated) {
			throw new HttpException(
				{
					error: 'No se encontro el usuario',
					where: this.service + '::updated',
				},
				HttpStatus.NOT_FOUND,
			);
		}
		await this.repUser.update({ id }, { ...user });
		return await this.getOne(id);
	}

	/**
	 * Deletes user service update status deletedAt true
	 * @param {number}  id key user to deleted
	 * @returns {Promise<{deleted:boolean}>} status deleted user
	 */
	async deleted(id: number): Promise<{ deleted: boolean }> {
		const user = await this.repUser.findOne({ id });
		if (!user) {
			throw new HttpException(
				{
					error: 'No se encontro el usuario',
					where: this.service + '::deleted',
				},
				HttpStatus.NOT_FOUND,
			);
		}
		await this.repUser.update({ id }, { deletedAt: new Date() });
		return { deleted: true };
	}
}
