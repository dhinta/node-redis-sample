import mongoose from 'mongoose';
const {Schema} = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, 'Blog title is required']
  },
  content: {
    type: String,
    unique: true,
    required: [true, 'Blog content is required']
  },
  doc: {type: Date, default: Date.now},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('Blog', blogSchema);
