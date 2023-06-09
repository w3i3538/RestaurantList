const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const routes = require('./routes')

const usePassport = require('./config/passport')
require('./config/mongoose')
const app = express()
const PORT = process.env.PORT
// set helper
const handlebars = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        eq: function (a, b) {
            return a === b;
        }
    }
})
// set engine
app.engine('hbs', handlebars.engine)
app.set('view engine', 'hbs')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))


app.use(express.static('public'))
// 每一個req都會經過bodyParser使用urlencoded解析
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))
// 呼叫 Passport 函式並傳入 app (在路由之前)
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.error_msg = req.flash('error_msg')
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    next()
})

app.use(routes)


app.listen(PORT, () => {
    console.log(`Express is listening on localhost:${PORT}`)
})