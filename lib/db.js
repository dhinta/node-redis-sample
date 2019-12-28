import mongoose from 'mongoose';

const MONGO_CONNECTION_URI = process.env.MONGO_CONNECTION_URI;

const connect = async () => {
  try {
    await mongoose.connect(
        MONGO_CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true}
    );
  } catch (error) {
    console.log('Error connect DB: ', error);
    mongoose.disconnect();
  }
};

mongoose.connection.on('error', console.log); // Not Tested So Far
mongoose.connection.on('open', () => console.log('Connected To Mongoose'));

connect();
