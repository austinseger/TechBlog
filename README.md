Tech Blog

Description

Tech Blog is a CMS-style blog site similar to WordPress, where developers can publish their blog posts and comment on others' posts. The application follows the MVC (Model-View-Controller) paradigm, using Handlebars.js as the templating language, Sequelize as the ORM, and Express.js for routing. The application also includes user authentication, session management, and data persistence using a PostgreSQL database.

Usage

Visit the homepage to view existing blog posts.
Sign up or log in to create a new post or comment on existing posts.
Navigate to the dashboard to view, edit, or delete your posts.
Log out when you're done.

Features

User authentication (sign-up, log-in, log-out).
Dashboard to manage blog posts.
Create, edit, and delete posts.
View and comment on other users' posts.
Responsive design.

Technologies Used

Node.js: JavaScript runtime for building the backend.
Express.js: Web framework for routing and middleware.
Sequelize: ORM for PostgreSQL database management.
PostgreSQL: Relational database for data persistence.
Handlebars.js: Templating engine for rendering dynamic HTML.
Express-Session: Middleware for managing user sessions.
bcrypt: Library for hashing user passwords.
dotenv: Module for loading environment variables from a .env file.

Project Structure

plaintext
Copy code
tech-blog/
├── config/
│   └── connection.js          # Sequelize database connection configuration
├── controllers/
│   ├── api/
│   │   ├── commentRoutes.js   # Routes for managing comments
│   │   ├── postRoutes.js      # Routes for managing posts
│   │   └── userRoutes.js      # Routes for user authentication
│   ├── homeRoutes.js          # Routes for homepage and dashboard
│   └── index.js               # Main router file
├── models/
│   ├── Comment.js             # Comment model
│   ├── Post.js                # Post model
│   └── User.js                # User model
├── public/
│   ├── css/                   # Stylesheets
│   ├── js/                    # Client-side JavaScript files
│   └── images/                # Static images
├── views/
│   ├── layouts/               # Handlebars layouts (main.hbs)
│   ├── partials/              # Reusable Handlebars partials
│   ├── home.handlebars        # Homepage template
│   ├── dashboard.handlebars   # Dashboard template
│   ├── login.handlebars       # Login template
│   └── signup.handlebars      # Signup template
├── .env                       # Environment variables
├── .gitignore                 # Files to ignore in version control
├── server.js                  # Entry point for the Node.js application
├── package.json               # Node.js dependencies and scripts
└── README.md                  # Project documentation

Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the established coding conventions and is well-documented.
