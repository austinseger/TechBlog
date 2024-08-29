const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      console.log('Login failed: Username not found');
      return res.status(400).json({ message: 'Incorrect username or password, please try again' });
    }

    const validPassword = userData.checkPassword(req.body.password);
    console.log('Password valid:', validPassword);

    if (!validPassword) {
      console.log('Login failed: Incorrect password');
      return res.status(400).json({ message: 'Incorrect username or password, please try again' });
    }

    req.session.save(() => {
      console.log('Session saved for user:', userData.username);
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.redirect('/dashboard');
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'An error occurred during login', error: err.message });
  }
});

router.post('/signup', async (req, res) => {
  try {
    console.log('Signup attempt for username:', req.body.username);

    const existingUser = await User.findOne({ where: { username: req.body.username } });

    if (existingUser) {
      console.log('Signup failed: Username already exists');
      return res.status(400).json({ message: 'Username already exists, please choose another one.' });
    }

    console.log('Creating new user...');

    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password, 
    });

    req.session.save(() => {
      console.log('Session saved for new user:', newUser.username);
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;
      res.status(200).json(newUser);
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Failed to sign up', error: err.message });
  }
});

module.exports = router;
