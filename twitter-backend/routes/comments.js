const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Tweet = require('../models/Tweet');
const Comment = require('../models/Comment');

// Create a comment for a tweet
router.post('/:tweetId', auth, async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ msg: 'Text is required' });
  try {
    const tweet = await Tweet.findById(req.params.tweetId);
    if (!tweet) return res.status(404).json({ msg: 'Tweet not found' });
    const comment = new Comment({ tweet: tweet.id, user: req.user.id, text });
    await comment.save();
    tweet.commentsCount = (tweet.commentsCount || 0) + 1;
    await tweet.save();
    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get comments for a tweet
router.get('/:tweetId', async (req, res) => {
  try {
    const comments = await Comment.find({ tweet: req.params.tweetId }).populate('user', 'name avatar').sort({ createdAt: -1 }).limit(100);
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete comment (owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ msg: 'Comment not found' });
    if (comment.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    await comment.remove();
    // decrement commentsCount on tweet
    await Tweet.findByIdAndUpdate(comment.tweet, { $inc: { commentsCount: -1 } });
    res.json({ msg: 'Comment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
