import mongoose, { Schema } from 'mongoose';
import { compare, hash } from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false, // Por defecto este campo nunca vendrá en las consultas
    }
});

// Método del modelo
userSchema.statics.hashPassword = (clearPassword) => {
    return hash(clearPassword, 7);
};

// Método de instáncia
// No utilizamos arrow function para no alterar el this de la instáncia
userSchema.methods.comparePassword = function(plainPassword) {
    return compare(plainPassword, this.password);
};

export const User = mongoose.model('User', userSchema);
