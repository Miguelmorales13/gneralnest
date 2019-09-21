import {
    HttpException,
    HttpStatus,
    Injectable,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthDTO } from './auth.dto';

/**
 * Injectable
 */
@Injectable()
export class AuthService {
    private readonly service = 'AuthService';
    constructor(
        private readonly _users: UserService,
        private readonly _jwt: JwtService,
    ) {}

    async validateUser({ user }: any) {
        return await this._users.getOneByUser(user.user);
    }

    async login(payload: Partial<AuthDTO>) {
        const user = await this._users.getOneByUser(payload.user);
        if (!user || !(await user.comparePassword(payload.password))) {
            throw new HttpException(
                {
                    error: 'Credenciales invalidas',
                    where: this.service + '::validateUser',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
        const token = await this._jwt.sign({ user });
        return { token, user };
    }
}
