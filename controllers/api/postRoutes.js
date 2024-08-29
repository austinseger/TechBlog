const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.userId,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.error('Failed to create post:', err);
    res.status(500).json({ message: 'Failed to create post', error: err.message });
  }
});

module.exports = router;
