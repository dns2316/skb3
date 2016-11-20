import mongoose from 'mongoose';

const { Schema } = mongoose;

const BallSchema = new Schema({
  type: String,
  name: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Ball', BallSchema);

// const blogSchema = new Schema({
//   title: String,
//   author: String,
//   body: String,
//   comments: [{body: String, date: Date}],
//   date: { type: Date, default: Date.now},
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs: Number,
//   }
// });
