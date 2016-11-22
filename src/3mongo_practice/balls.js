import mongoose from 'mongoose';
import _ from 'lodash';

const { Schema } = mongoose;

const BallSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['football', 'volleyball', 'basketball'],
  },
  name: {
      type: String,
      required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

BallSchema.methods.toJSON = function () {
  return _.pick(this, ['name', 'type', 'owner', 'createdAt']);
};
export default mongoose.model('Ball', BallSchema);
