const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');  
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');  
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({}); 

app.engine('handlebars', hbs.engine);  
app.set('view engine', 'handlebars');  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'supersecretkey', 
  resave: false,
  saveUninitialized: false, 
  cookie: {
    maxAge: 2 * 60 * 60 * 1000, 
    httpOnly: true,
    secure: false, 
    sameSite: 'strict',
  },
  store: new SequelizeStore({
    db: sequelize,
  }),
}));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
});
