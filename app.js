const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
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

//每一個req都會經過bodyParser使用urlencoded解析
app.use(bodyParser.urlencoded({ extended: true }))


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
        return res.redirect('/')
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

// 新增餐廳
app.post('/restaurants', (req, res) => {
    return Restaurants.create(req.body)
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))
})

// 新增餐廳
app.get('/restaurants/new', (req, res) => {
    return res.render("new")
})

// 瀏覽特定餐廳
app.get('/restaurants/:restaurant_id', (req, res) => {
    const { restaurant_id } = req.params
    return Restaurants.findById(restaurant_id)
        .lean()
        .then((restaurant) => res.render('show', { restaurant }))
        .catch((error) => console.log('error'))
})

// 編輯餐廳頁面
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
    const { restaurant_id } = req.params
    return Restaurants.findById(restaurant_id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(err => console.log(err))
})

// 更新餐廳
app.post("/restaurants/:restaurant_id", (req, res) => {
    const { restaurant_id } = req.params;
    return Restaurants.findByIdAndUpdate(restaurant_id, req.body)
        .then(() => res.redirect(`/restaurants/${restaurant_id}`))
        .catch(error => console.log(error));
})


// 刪除餐廳
app.post('/restaurants/:restaurant_id/delete', (req, res) => {
    const { restaurant_id } = req.params
    return Restaurants.findByIdAndDelete(restaurant_id)
        .then(() => res.redirect('/'))
        .catch((err) => console.log('err'))
})

//確認伺服器是否開啟
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})