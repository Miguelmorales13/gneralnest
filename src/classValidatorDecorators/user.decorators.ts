import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { Repository } from "typeorm";
import { UserEntity } from "../entitys/user.entity";
import { UserService } from "../core/user/user.service";

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor(private  _user: UserService ){

    }
    async validate(userName: any, args: ValidationArguments) {
        let user = await this._user.getOneByUser(userName)
        return user?false:true;
    }

}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserAlreadyExistConstraint
        });
   };
}