const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurants.results})
})

app.get('/search',(req,res)=>{
    const keyword = req.query.keyword
    const restaurantFilter = restaurants.results.filter(restaurant=>{
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.toLowerCase())
    }) 
    res.render('index', { restaurants: restaurantFilter, keyword: keyword })
})

app.get('/restaurants/:restaurant_id', (req,res)=>{
    const restaurant = restaurants.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)

    res.render('show', { restaurant })
})

app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})