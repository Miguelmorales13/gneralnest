import * as mongoose from 'mongoose';

export const Image = new mongoose.Schema({
    title: { type: String, required: [true, 'El titulo es requerido'] },
    description: { type: String },
    name: { type: String, required: [true, 'La nombre es requerida'] },
    isSystem: { type: Boolean, default:false},
    _category: { type: mongoose.Schema.Types.ObjectId, ref: "CategoriesImages" },
    deletedAt: { type: Date, default: null },
},{ timestamps: true});

Image.pre('aggregate', () => {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: null } } })
})

export interface IImage extends mongoose.Document {
    title:string
    description:string
    name:string
    isSystem:boolean
    _category:any
}
