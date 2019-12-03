import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt'
export const User = new mongoose.Schema({
    name: { type: String, required: [true, 'El nombre es requerido'] },
    lastName: { type: String, required: [true, 'Los apellidos son requerios'] },
    user: { type: String,index:true, unique: [true, 'El usuario ya existe'] },
    email: { type: String,index:true, unique: [true, 'El correo ya existe'], required: [true, 'El correo es requerido'] },
    firtsLogin: { type: Boolean, default: true },
    active: { type: Boolean, default: true },
    password: {
        type: String,
        required: true,
        set: function (value: string) {
            if (!value) return ''
            return bcrypt.hashSync(value, 10)
        }
    },
    deletedAt: { type: Date, default: null },
    rol: { type:String,enum:['Administrador','GerenteDivicional','GerenteDistrital','GerenteMarca','RepresentanteMedico','Supervisor','Consultor'] },
}, { timestamps: true });
User.methods.comparePassword= function (compare: string) {
    return bcrypt.compareSync(compare, this.password);
}

User.post('update', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('El usuario o correo ya esta registrado'));
    } else {
        next();
    }
})
User.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('El usuario o correo ya esta registrado'));
    } else {
        next();
    }
})
User.pre('aggregate', () => {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: null } } })
})
export type Rol='Administrador'|'GerenteDivicional'|'GerenteDistrital'|'GerenteMarca'|'RepresentanteMedico'|'Supervisor'|'Consultor'
export enum RolEnum{
    'Administrador',
    'GerenteDivicional',
    'GerenteDistrital',
    'GerenteMarca',
    'RepresentanteMedico',
    'Supervisor',
    'Consultor'
}

export interface IUser extends mongoose.Document {
    name: string
    lastName: string
    user: string
    email: string
    firstLogin: string
    active: string
    password: string
    rol: Rol
    comparePassword(compare:string): any
}

