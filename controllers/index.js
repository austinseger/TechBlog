const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./api/userRoutes'); 
const commentRoutes = require('./api/commentRoutes');
const postRoutes = require('./api/postRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes); 
router.use('/api/users', userRoutes);
router.use('/api/comments', commentRoutes);
router.use('/api/posts', postRoutes);
router.use('/api', apiRoutes);

router.post('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).json({ message: 'Failed to log out.' });
        } else {
          res.status(200).json({ message: 'Logged out successfully.' });
        }
      });
    } else {
      res.status(400).json({ message: 'No session found.' });
    }
  });

module.exports = router;
