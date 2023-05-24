const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [{
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  });

  const Thought = model('Thought', thoughtSchema);
  module.exports = Thought;
  