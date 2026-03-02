const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Tweet = require('../models/Tweet');
const User = require('../models/User');

// Create a tweet
router.post('/', auth, async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ msg: 'Content is required' });
  try {
    const tweet = new Tweet({ user: req.user.id, content });
    await tweet.save();
    res.json(tweet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get recent tweets
router.get('/', async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(tweets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single tweet
router.get('/:id', async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id).populate('user', 'name avatar');
    if (!tweet) return res.status(404).json({ msg: 'Tweet not found' });
    res.json(tweet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete tweet (owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) return res.status(404).json({ msg: 'Tweet not found' });
    if (tweet.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    await tweet.remove();
    res.json({ msg: 'Tweet removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Toggle like
router.post('/like/:id', auth, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) return res.status(404).json({ msg: 'Tweet not found' });
    const liked = tweet.likes.some(l => l.toString() === req.user.id);
    if (liked) {
      tweet.likes = tweet.likes.filter(l => l.toString() !== req.user.id);
    } else {
      tweet.likes.unshift(req.user.id);
    }
    await tweet.save();
    res.json({ likes: tweet.likes.length });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
