// controllers/homeRoutes.js
const router = require('express').Router();

// Render the homepage
router.get('/', (req, res) => {
  res.render('home', { loggedIn: req.session.loggedIn }); // Pass session data to the homepage
});

// Render the login page
router.get('/login', (req, res) => {
  res.render('login'); // Ensure this matches the login.handlebars template in the views folder
});

// Render the dashboard page
router.get('/dashboard', (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('/login'); // Redirect to login if the user is not logged in
  }
  res.render('dashboard', { loggedIn: req.session.loggedIn }); // Render the dashboard view
});

module.exports = router;
