const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')



// 登入區塊
router.get('/login', (req, res) => {
    res.render('login')
})
// 加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

// 註冊區塊
router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    // 檢查是否註冊
    User.findOne({ email }).then(user => {
        // 若已註冊－退回原頁
        if (user) {
            console.log('User already exists.')
            res.render('register', {
                name,
                email,
                password,
                confirmPassword
            })
        } else {
            // 若沒註冊－寫入資料庫
            return User.create({
                name,
                email,
                password
            })
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))
        }
    })
        .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/users/login')
})

module.exports = router