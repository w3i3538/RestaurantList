const express = require('express')
const router = express.Router()

const Restaurants = require('../../models/restaurant')

//設定搜尋路由
router.get('/search', (req, res) => {
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
router.post('/', (req, res) => {
    return Restaurants.create(req.body)
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))
})

// 新增餐廳
router.get('/new', (req, res) => {
    return res.render("new")
})

// 瀏覽特定餐廳
router.get('/:restaurant_id', (req, res) => {
    const { restaurant_id } = req.params
    return Restaurants.findById(restaurant_id)
        .lean()
        .then((restaurant) => res.render('show', { restaurant }))
        .catch((error) => console.log('error'))
})

// 編輯餐廳頁面
router.get('/:restaurant_id/edit', (req, res) => {
    const { restaurant_id } = req.params
    return Restaurants.findById(restaurant_id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(err => console.log(err))
})

// 更新餐廳
router.put("/:restaurant_id", (req, res) => {
    const { restaurant_id } = req.params;
    return Restaurants.findByIdAndUpdate(restaurant_id, req.body)
        .then(() => res.redirect(`/restaurants/${restaurant_id}`))
        .catch(error => console.log(error));
})


// 刪除餐廳
router.delete('/:restaurant_id', (req, res) => {
    const { restaurant_id } = req.params
    return Restaurants.findByIdAndDelete(restaurant_id)
        .then(() => res.redirect('/'))
        .catch((err) => console.log('err'))
})

module.exports = router