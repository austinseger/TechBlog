const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Fetch posts by the logged-in user from the 'post' table
    const postData = await Post.findAll({
      where: { userId: req.session.userId },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Convert the data to plain JSON
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard view, passing in the posts data
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error('Failed to load dashboard:', err);
    res.status(500).json({ message: 'Failed to load dashboard', error: err.message });
  }
});

module.exports = router;
