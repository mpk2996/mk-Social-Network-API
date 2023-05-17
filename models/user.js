const userSchema = new mongoose.Schema({
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    thoughts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought',
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  