/**
 * Entity  Categories Iamges
 */

import * as mongoose from 'mongoose';

export const CategoriesImages = new mongoose.Schema({
    description: { type: String, required: [true, 'La descripcion es requerida'] },
    name: { type: String, required: [true, 'El nombre es requerido'] },
    deletedAt: { type: Date, default: null },
    isSystem: { type: Boolean, default:false}
},{ timestamps: true });

CategoriesImages.pre('aggregate', () => {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: null } } })
})

export interface ICategoriesImages extends mongoose.Document{
    description:string
    name:string
    isSystem:boolean
} 