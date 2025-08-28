import { Schema, model, Document } from 'mongoose';

interface IAdmin extends Document {
    username: string;
    email: string;
}

const AdminSchema = new Schema<IAdmin>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

const Admin = model<IAdmin>('Admin', AdminSchema);

export default Admin;