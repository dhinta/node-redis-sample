import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  doj: {type: Date, default: Date.now},
  role: {type: String, default: 'Admin'}
});

mongoose.model('User', userSchema);
