import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './user.entity';

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
        @InjectModel("Users")
        private readonly repUser: Model<IUser>,
    ) {}

    /**
     * Gets all users
     * @returns {Promise<IUser[]>} users un database
     */
    async getAll(): Promise<IUser[]> {
        return await this.repUser.find({},"email firtsLogin _id name lastname user active createdAt updatedAt rol");
    }

    /**
     * Gets one user
     * @param {number} id  key  to user serched
     * @returns {Promise<IUser>} user serched
     */
    async getOne(_id: string): Promise<IUser> {
        const user = await this.repUser.findOne( { _id, deletedAt: null },"email firtsLogin _id name lastname user active createdAt rol" )
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
    async getOneByUser(user: string): Promise<IUser> {
        const userFinded = await this.repUser.findOne({ 
            $or:[{user},{email:user}]
        },
        'email firtsLogin _id name lastname user active createdAt updatedAt rol'
        );
        return userFinded;
    }

    /**
     * Creates user service
     * @param {UserDTO} newUser data to create new user
     * @returns  { Promise<IUser>} user created
     */
    async created(newUser: Partial<UserDTO>): Promise<IUser> {
        const user = await this.repUser.create(newUser as IUser);
        return user
    }

    /**
     * Updated user service
     * @param {number} id key to user update
     * @param  {UserDTO} user new data for user updated
     * @returns {Promise<UserDTO[]>} user updated
     */
    async updated(_id: string, user: Partial<UserDTO>): Promise<IUser> {
        const userUpdated = await this.repUser.findOne({ _id, });
        if (!userUpdated) {
            throw new HttpException(
                {
                    error: 'No se encontro el usuario',
                    where: this.service + '::updated',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        await userUpdated.update( { ...user });
        return { ...userUpdated, ...user } as IUser;
    }

    /**
     * Deletes user service update status deletedAt true
     * @param {number}  id key user to deleted
     * @returns {Promise<{deleted:boolean}>} status deleted user
     */
    async deleted(_id: string): Promise<{ deleted: boolean }> {
        const user = await this.repUser.findOne({ _id, });
        if (!user) {
            throw new HttpException(
                {
                    error: 'No se encontro el usuario',
                    where: this.service + '::deleted',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        await user.update( { deletedAt: new Date() });
        return { deleted: true };
    }
}
