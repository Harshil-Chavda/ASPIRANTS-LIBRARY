import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true,
    },
});

// Method to find a user by email
userSchema.statics.findByEmail = function (email: string) {
    return this.findOne({ email });
};

// Method to create a new user
userSchema.statics.createUser = function (username: string, email: string, password: string) {
    const user = new this({ username, email, password });
    return user.save();
};

const User = model<IUser>('User', userSchema);

export default User;