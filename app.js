const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')

//引擎設置
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//靜態檔案
app.use(express.static('public'))

//設定路由
app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurants.results})
})

//設定搜尋路由
app.get('/search',(req,res)=>{
    const keyword = req.query.keyword
    const restaurantFilter = restaurants.results.filter(restaurant=>{
        return restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.trim().toLowerCase())
    }) 
    res.render('index', { restaurants: restaurantFilter, keyword: keyword })
})

//動態路由
app.get('/restaurants/:restaurant_id', (req,res)=>{
    const restaurant = restaurants.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)

    res.render('show', { restaurant })
})

//確認伺服器是否開啟
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})