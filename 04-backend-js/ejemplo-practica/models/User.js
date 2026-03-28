import mongoose, { Schema } from 'mongoose';
import { compare, hash } from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false,
    }
});

userSchema.statics.hashPassword = (clearPassword) => {
    return hash(clearPassword, 7);
};

userSchema.methods.comparePassword = function(plainPassword) {
    return compare(plainPassword, this.password);
};

export const User = mongoose.model('User', userSchema);