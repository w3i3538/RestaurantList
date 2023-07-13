const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const routes = require('./routes')

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
//引擎設置
app.engine('hbs', handlebars.engine)
app.set('view engine', 'hbs')
//靜態檔案
app.use(express.static('public'))
//每一個req都會經過bodyParser使用urlencoded解析
app.use(bodyParser.urlencoded({ extended: true }))
//方法覆蓋
app.use(methodOverride('_method'))
//路由
app.use(routes)

//確認伺服器是否開啟
app.listen(PORT, () => {
    console.log(`Express is listening on localhost:${PORT}`)
})