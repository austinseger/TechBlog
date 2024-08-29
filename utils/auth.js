module.exports = (req, res, next) => {
    if (!req.session.loggedIn) {
      return res.redirect('/login'); // Redirect to login if the user is not logged in
    }
    next(); // Proceed to the next middleware/route handler if logged in
  };
  