const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const { database } = require('./keys')
const flash = require('connect-flash')
const passport = require('passport')

//Initializations
const app = express()
require('./lib/passport')

//Settings
dotenv.config({path: './src/.env'})
app.set('PORT', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: 'hbs',
  helpers: require('./lib/handlebars')
}).engine)
app.set('view engine', '.hbs')

//Middlewares
app.use(session({
  secret: 'fiido123',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('dev'))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

//Global variables
app.use((req, res, next) => {
  app.locals.success = req.flash('success')
  app.locals.message = req.flash('message')
  app.locals.user = req.user
  next()
})

//Routes
app.use(require('./routes/'))
app.use('/task', require('./routes/task'))
app.use('/auth', require('./routes/auth'))

//Public
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('PORT'), () => {
  console.log('Server listen on port', app.get('PORT'));
})