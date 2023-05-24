const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const User = model('User', userSchema);

  module.exports = User;