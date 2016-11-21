import mongoose from 'mongoose';
import _ from 'lodash';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
}, {
  timestamps: true,
});

UserSchema.methods.toJSON = function () { //  func lodash`s. Долько для вывода юзеру. Для того, что бы работало и в консоли toJSON заменить на toObject.
  return _.pick(this, ['name']); // func lodash`s. Лодаш берез из this (из текущего объекта только поле name).
};

export default mongoose.model('User', UserSchema);
