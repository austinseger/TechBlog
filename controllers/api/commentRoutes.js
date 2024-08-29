// controllers/api/commentRoutes.js
const router = require('express').Router();
const { Comment } = require('../../models');

// Route to create a new comment
router.post('/', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'You must be logged in to comment' });
    }

    const newComment = await Comment.create({
      content: req.body.content,
      postId: req.body.postId,
      userId: req.session.userId,  // Assuming the user is logged in
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create comment', error: err.message });
  }
});

// Route to get comments for a specific post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        postId: req.params.postId,
      },
    });

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve comments', error: err.message });
  }
});

// Route to delete a comment (if you want to add this feature)
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,  // Ensure the logged-in user is the owner of the comment
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete comment', error: err.message });
  }
});

module.exports = router;
