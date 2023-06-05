const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Restaurants = require('./models/restaurant')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()
const port = 3000

//設定連線到DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//取得DB連線狀態
const db = mongoose.connection
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
})

//引擎設置
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//靜態檔案
app.use(express.static('public'))

//設定路由
app.get('/', (req, res) => {
    Restaurants.find()
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(err => console.log(err))

})

//設定搜尋路由
app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    if (!keyword) {
        res.redirect('/')
    }
    Restaurants.find()
        .lean()
        .then(restaurants => {
            const restaurantFilter = restaurants.filter(restaurant => {
                return restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.trim().toLowerCase())
            })
            res.render('index', { restaurants: restaurantFilter, keyword: keyword })
        })
        .catch(err => console.log(err))


})

//動態路由
app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurant = Restaurants.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)

    res.render('show', { restaurant })
})

//確認伺服器是否開啟
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})