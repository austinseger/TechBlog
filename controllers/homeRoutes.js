const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home', { loggedIn: req.session.loggedIn }); 
});

router.get('/login', (req, res) => {
  res.render('login'); 
});

router.get('/dashboard', (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('/login'); 
  }
  res.render('dashboard', { loggedIn: req.session.loggedIn }); 
});

module.exports = router;
