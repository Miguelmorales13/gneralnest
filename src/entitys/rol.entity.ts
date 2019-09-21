import { Entity, Column, OneToMany } from 'typeorm';
import { Generar } from './General.entity';
import { UserEntity } from './user.entity';

/**
 * Entity  rol
 */
@Entity('rol')
export class RolEntity extends Generar {
    @Column({ length: 100, unique: true })
    name: string;

    @Column({ type: 'json' })
    access: RolAccess;

    @OneToMany((type) => UserEntity, (user) => user.rol)
    users: UserEntity[];
}

/**
 * Access
 */
export interface Access {
    read: boolean;
    write: boolean;
}

/**
 * Rol access
 */
export interface RolAccess {
    users: Access;
    rols: Access;
}
