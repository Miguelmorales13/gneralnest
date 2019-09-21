import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';
import { Generar } from './General.entity';
import { RolEntity } from './rol.entity';
/**
 * Entity user
 */
@Entity('user')
export class UserEntity extends Generar {
    @Column({ length: 100 })
    name: string;

    @Column({ length: 100, unique: true })
    user: string;

    @Column({ length: 100, unique: true })
    email: string;


    @Column({ length: 60 })
    password: string;

    @Column({ length: 100 })
    lastname: string;

    @ManyToOne((type) => RolEntity, (rol) => rol.users, { cascade: true })
    rol: RolEntity;

    @Column({ default: true })
    active: boolean;

    constructor(partial: Partial<UserEntity>) {
        super();
        Object.assign(this, partial);
    }

    @BeforeInsert()
    setPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    comparePassword(compare: string) {
        return bcrypt.compareSync(compare, this.password);
    }
}
