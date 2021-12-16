# Web applications project work
This is my web applications project. In this I have made code snipping website with basic functionalities: register, login, home page (where user can see all posts and make their own) 
And way to load one snippet where user can see and also comment posts made. If user is not logged in, he can just see posts but not post or comment them.

## Installing

After downloading project, you can start server with command:
### `npm start`
This starts a server which listens to port 3000.
You can view site on browser in [http://localhost:3000](http://localhost:3000)
In console, you can see every post and get request made by user or program.
(When the application is run the first time it generates a mongodb database called projectdb which is used to store users, their posts and comments)

NOTE! Database is empty when first started

## User manual
[http://localhost:3000](http://localhost:3000) directs user to inedx page. In here every code snippet is shown to user.

User can return to index page anytime by pressing My site at the navigation bar.

To add a code snippet, a user must first create an account or login. This can be done by links in the top right corner of the window. 

In register page, user can create an account by typing wanted username and password to their dedicated fields and then pressing register. Only restrictions are that password has to have
8 or more characters and there cannot be 2 users registered with same username. If this is done successfully user will be redirected to the logging page.

In the login page, a user can log in by using the username and password that he has used to register an account for the site. After successful login, user will be redirected to the index page.

When the user is logged in, he can add snippets to the site in the index page. Here under navigation bar, user has a text field where the user can type said snippet and then post it to the site using post snippet button.

Every post has also gone to post button. After clicking this, the user is redirected to a page where the user can see the post that was opened and also see comments on the post and also if logged in he/she can also post comments.

## Technology choices

### Materialize css
For CSS I have used materialize CSS to give site a nice look. This is done with materialize
because I have already some knowledge about it from this course.

### Node.js
Node.js is the back-end JavaScript runtime environment. I have chosen this because it was used in this course, so I have prior experience with it.

### Express.js
Express JS is a backend application framework for node js.

### bcrypt.js
Bcrypt.js is used to hash password and to generate salt for hashing. I used this because i had already in other exercise implemented this, so it was easy to implement here also.

### passport-jwt 
This is a strategy for passport that uses JSON Web Token for authentication. Also, this was implemented in earlier studies. With this, we can check if user
has right JWT to make requests such as add comment to server side.

### MongoDB and Mongoose
For database, I have selected MongoDB, which is a document oriented database program. To model this data, I have used mongoose, because it simplifies how to implement saving data to database.

## Features and points
Only basic features are implemented. Because of that, my aim is 25 points.
