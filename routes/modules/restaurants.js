const express = require('express')
const router = express.Router()


const Restaurants = require('../../models/restaurant')

// 新增餐廳
router.get('/new', (req, res) => {
    return res.render("new")
})

// 新增餐廳
router.post('/', (req, res) => {
    const userId = req.user._id

    return Restaurants.create({ ...req.body, userId })
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))
})


// 瀏覽特定餐廳
router.get('/:restaurant_id', (req, res) => {
    const { restaurant_id } = req.params
    const userId = req.user._id

    return Restaurants.findOne({ _id: restaurant_id, userId })
        .lean()
        .then((restaurant) => res.render('show', { restaurant }))
        .catch((error) => console.log('error'))
})

// 編輯餐廳頁面
router.get('/:restaurant_id/edit', (req, res) => {
    const { restaurant_id } = req.params
    const userId = req.user._id

    return Restaurants.findOne({ _id: restaurant_id, userId })
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(err => console.log(err))
})

// 更新餐廳
router.put("/:restaurant_id", (req, res) => {
    const { restaurant_id } = req.params
    const userId = req.user._id

    return Restaurants.findByIdAndUpdate({_id: restaurant_id, userId}, req.body)
        .then(() => res.redirect(`/restaurants/${restaurant_id}`))
        .catch(error => console.log(error));
})


// 刪除餐廳
router.delete('/:restaurant_id', (req, res) => {
    const { restaurant_id } = req.params
    const userId = req.user._id

    return Restaurants.findByIdAndDelete({ _id: restaurant_id, userId })
        .then(() => res.redirect('/'))
        .catch((err) => console.log('err'))
})

module.exports = router