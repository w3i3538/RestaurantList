const express = require('express')
const router = express.Router()


const Restaurants = require('../../models/restaurant')

router.get('/', (req, res) => {
    const userId = req.user._id
    
    Restaurants.find({userId})
        .lean()
        .sort({ _id: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(err => console.log(err))
})

module.exports = router