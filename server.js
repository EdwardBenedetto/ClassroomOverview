const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require("method-override");
const flash = require('express-flash');
const logger = require('morgan');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest;
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const postRoutes = require('./routes/posts');
const feedRoutes = require('./routes/feed');
const postPageRoutes = require('./routes/postPage');
const commentRoutes = require("./routes/comments");

//Require .env file in config folder
dotenv.config({ path: "./config/.env" });

// Passport config
require('./config/passport')(passport)

// Connect to Database
connectDB()

// Uses Ejs for views
app.set('view engine', 'ejs')

// Static Folder
app.use(express.static('public'))

// Body Parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Logging
app.use(logger('dev'))
// app.use(morgan('dev'))

//Use forms for put / delete
app.use(methodOverride("_method"));


// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', mainRoutes)
app.use('/post', postRoutes)
app.use('/feed', feedRoutes)
app.use('/postPage', postPageRoutes)
app.use("/comment", commentRoutes);

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better go catch it!')
})