const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  tweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true, maxlength: 1000 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
