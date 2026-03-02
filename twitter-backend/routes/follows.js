const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Follow = require('../models/Follow');
const User = require('../models/User');

// Follow a user
router.post('/:userId', auth, async (req, res) => {
  try {
    const targetId = req.params.userId;
    if (targetId === req.user.id) return res.status(400).json({ msg: 'Cannot follow yourself' });
    const existing = await Follow.findOne({ follower: req.user.id, following: targetId });
    if (existing) return res.status(400).json({ msg: 'Already following' });
    const follow = new Follow({ follower: req.user.id, following: targetId });
    await follow.save();
    await User.findByIdAndUpdate(req.user.id, { $addToSet: { following: targetId } });
    await User.findByIdAndUpdate(targetId, { $addToSet: { followers: req.user.id } });
    res.json({ msg: 'Followed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Unfollow a user
router.delete('/:userId', auth, async (req, res) => {
  try {
    const targetId = req.params.userId;
    await Follow.findOneAndDelete({ follower: req.user.id, following: targetId });
    await User.findByIdAndUpdate(req.user.id, { $pull: { following: targetId } });
    await User.findByIdAndUpdate(targetId, { $pull: { followers: req.user.id } });
    res.json({ msg: 'Unfollowed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get followers
router.get('/:userId/followers', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('followers', 'name avatar');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user.followers || []);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get following
router.get('/:userId/following', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('following', 'name avatar');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user.following || []);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
