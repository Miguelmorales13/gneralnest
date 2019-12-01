import * as mongoose from 'mongoose';
import { find } from 'rxjs/operators';

const Access = new mongoose.Schema({
    read: Boolean,
    write: Boolean,
}, { _id: false });

const RolAccess = new mongoose.Schema({
    users: { type: Object, obj: Access },
    rols: { type: Object, obj: Access }
}, { _id: false });


export const Rol = new mongoose.Schema({
    name: { type: String, unique: [true, "El nombre ya existe"], required: [true, 'La nombre es requerido'] },
    access: { type: Object, obj: RolAccess },
    isSystem: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

Rol.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('El nombre ya esta registrado'));
    } else {
        next();
    }
})
Rol.post('update', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('El nombre ya esta registrado'));
    } else {
        next();
    }
})
Rol.pre('aggregate', () => {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: null } } })
})

interface IAccess extends mongoose.Document {
    read: Boolean
    write: Boolean
}
interface IRolAccess extends mongoose.Document {
    users: IAccess
    rols: IAccess
}
export interface IRol extends mongoose.Document {
    name: string,
    isSystem: boolean
    access: IRolAccess
}


