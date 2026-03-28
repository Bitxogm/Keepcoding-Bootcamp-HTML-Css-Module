import { connect } from 'mongoose';

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017';

export function connectMongoose() {
    return connect(url)
        .then(mongoose => mongoose.connection);
};