import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
    name: { type: String, unique: true },
    price: { type: Number, min: 0, index: true },
    owner: {
        type: Schema.Types.ObjectId, ref: 'User', index: true
    },
    tags: [String],
});

export const Product = mongoose.model('Product', productSchema);