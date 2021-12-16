# Web applications project work
This is my web applications project. In this i have made code snippeting web site with basic functionalities: register, login, home page (where user can see all psts and make their own) 
and way to load one snippet where user can see and also comment posts made. If user is nod logged in he can just see posts but not post or comment them.

## Installing

After downloading project you can start server with command:
### `npm start`
this starts an server which listens to port 3000.
You can view site on browser in [http://localhost:3000](http://localhost:3000)
In console you can see every post and get request made by user or program.
(When application is run first time it generates mongodb database called projectdb which is used to store users, their posts and comments)

NOTE! Database is empty when first started

## User manual
[http://localhost:3000](http://localhost:3000) directs user to inedx page. In here every code snippet is shown to user.

To add code snippet user must first create account or login. This can be done by links in the topright corner of the window. 

In register page user can create account by typing wanted username and password to their dedicated fields and then pressing register. Only restrictions are that password has to have
8 or more characters and there cannot be 2 users registered with same username. If this is done succesfully user will be redirectred to loging page.

In login page user can login by using username and password that he has used to register account for the site. After succesful login user will be redirected to index page.

When user is logged in he can add snippets to the site in the index page. Here under navigationbar user has text field where user can type said snippet and then post it to the site using post snippet button.

Every post has also go to post button. After clicking this user is redirected to page whereuser can see post that was opened and also see comments on the post and also if logged in he/she can also post comments.

## Technology choices

### Materialize css
For css I have used materialize css to give site nice look. This is done with materialize
because I have already some knowledge about it from this course.

### Node.js
Node.js is back-end JavaScript runtime environment. I have chosen this because it was used in this course so i have prior experience with it.

### Express.js
Express js is backend application framework for node js.

### bcrypt.js
Bcrypt.js is used to hash password and to generate salt for hashing. I used this because i had already in other exercise implemented this so it was easy to implement here also.

### passport-jwt 
This is strategy for passport that uses JSON Web Token for authentication. Also this was implemented in earlier studies. With this we can check if user
has right JWT to make requests such as add comment to server side.

### MongoDB and Mongoose
For database I have chosen MongoDB which is document orianted database program. To model this data I have usen mongoose, because it simplifies how to implement saving data to database.

