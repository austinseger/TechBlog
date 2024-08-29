const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');  // Import express-handlebars
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');  // Import your Sequelize connection
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js as the template engine
const hbs = exphbs.create({});  // Create an instance of express-handlebars

app.engine('handlebars', hbs.engine);  // Register Handlebars as the template engine
app.set('view engine', 'handlebars');  // Set Handlebars as the default view engine

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up sessions with Sequelize store
app.use(session({
  secret: 'supersecretkey',  // Replace with an actual secret in production
  resave: false,
  saveUninitialized: false,  // Ensure this is false to avoid creating unnecessary sessions
  cookie: {
    maxAge: 2 * 60 * 60 * 1000,  // 2 hours
    httpOnly: true,
    secure: false,  // Set to true if using HTTPS
    sameSite: 'strict',  // Adjust for strict cross-site handling
  },
  store: new SequelizeStore({
    db: sequelize,
  }),
}));

// Use routes
app.use(routes);

// Sync Sequelize and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
});
