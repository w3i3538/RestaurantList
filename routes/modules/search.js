const express = require('express')
const router = express.Router()


const Restaurants = require('../../models/restaurant')

//設定搜尋路由
router.get('/', (req, res) => {

    const { keyword = '', way = '0', sort = 'asc' } = req.query

    let selectedOption = '選擇排序方式'
    // 0=>_id, 1=>name, 2=>category, 3=>location
    switch (way) {
        case '0':
            selectedOption = '使用預設排序'
            Restaurants.find()
                .lean()
                .sort({ _id: sort === 'asc' ? 'asc' : 'desc' })
                .then(restaurants => {
                    const restaurantFilter = restaurants.filter(restaurant => {
                        return restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.trim().toLowerCase())
                    })
                    res.render('index', { restaurants: restaurantFilter, keyword, way, sort })
                })
                .catch(err => console.log(err))
            break
        case '1':
            selectedOption = '按照名稱排序'
            Restaurants.find()
                .lean()
                .sort({ name: sort === 'asc' ? 'asc' : 'desc' })
                .then(restaurants => {
                    const restaurantFilter = restaurants.filter(restaurant => {
                        return restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.trim().toLowerCase())
                    })
                    res.render('index', { restaurants: restaurantFilter, keyword, way, sort })
                })
                .catch(err => console.log(err))
            break
        case '2':
            selectedOption = '按照類別排序'
            Restaurants.find()
                .lean()
                .sort({ category: sort === 'asc' ? 'asc' : 'desc' })
                .then(restaurants => {
                    const restaurantFilter = restaurants.filter(restaurant => {
                        return restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.trim().toLowerCase())
                    })
                    res.render('index', { restaurants: restaurantFilter, keyword, way, sort })
                })
                .catch(err => console.log(err))
            break
        case '3':
            selectedOption = '按照區域排序'
            Restaurants.find()
                .lean()
                .sort({ location: sort === 'asc' ? 'asc' : 'desc' })
                .then(restaurants => {
                    const restaurantFilter = restaurants.filter(restaurant => {
                        return restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.trim().toLowerCase())
                    })
                    res.render('index', { restaurants: restaurantFilter, keyword, way, sort })
                })
                .catch(err => console.log(err))
            break
        default:
            selectedOption = '選擇排序方式'
            Restaurants.find()
                .lean()
                .sort({ _id: sort === 'asc' ? 'asc' : 'desc' })
                .then(restaurants => {
                    const restaurantFilter = restaurants.filter(restaurant => {
                        return restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.trim().toLowerCase())
                    })
                    res.render('index', { restaurants: restaurantFilter, keyword, way, sort })
                })
                .catch(err => console.log(err))
            break
    }
})

module.exports = router