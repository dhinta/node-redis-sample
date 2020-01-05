import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    validate: [{
      validator: (val) => {
        return (val.length >= 6 && val.length <= 15);
      },
      message: 'Username length should be within 6 to 15'
    }]
  },
  email: {
    type: String,
    validate: {
      validator: (val) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(val.toLowerCase());
      },
      message: 'Invalid Email'
    }
  },
  password: String,
  doj: {type: Date, default: Date.now},
  role: {type: String, default: 'Admin'}
});

mongoose.model('User', userSchema);
