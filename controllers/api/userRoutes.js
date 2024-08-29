const router = require('express').Router();
const { User } = require('../../models');

// User login route
router.post('/login', async (req, res) => {
  try {
    // Find the user by username
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      console.log('Login failed: Username not found');
      return res.status(400).json({ message: 'Incorrect username or password, please try again' });
    }

    // Validate the password
    const validPassword = userData.checkPassword(req.body.password);
    console.log('Password valid:', validPassword);

    if (!validPassword) {
      console.log('Login failed: Incorrect password');
      return res.status(400).json({ message: 'Incorrect username or password, please try again' });
    }

    // Save the session and redirect to the dashboard
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

// User signup route
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup attempt for username:', req.body.username);

    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username: req.body.username } });

    if (existingUser) {
      console.log('Signup failed: Username already exists');
      return res.status(400).json({ message: 'Username already exists, please choose another one.' });
    }

    console.log('Creating new user...');

    // Create the new user
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password, // Password hashing is handled in the User model
    });

    // Save the session for the new user and log the session data
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
