import * as mongoose from 'mongoose';

export const TestSchema = new mongoose.Schema({
	name: String,
}, { timestamps: { createdAt: true, updatedAt: true } });
