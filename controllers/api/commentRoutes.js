const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'You must be logged in to comment' });
    }

    const newComment = await Comment.create({
      content: req.body.content,
      postId: req.body.postId,
      userId: req.session.userId,  
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create comment', error: err.message });
  }
});

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

router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,  
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
