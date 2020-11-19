import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String, required: true },
  age: { type: String, require: true },
});
const userModel = mongoose.model('User', userSchema);

export default userModel;
