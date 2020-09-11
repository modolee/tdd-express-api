import mongoose from 'mongoose';

const UserSchema = {
  name: { type: String, required: true },
  position: { type: String, required: true },
  roles: { type: [String], required: true }
};

const userModel = mongoose.model('user', UserSchema);

export default userModel;
