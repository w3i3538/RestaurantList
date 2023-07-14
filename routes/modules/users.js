const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')



// 登入區塊
router.get('/login', (req, res) => {
    res.render('login')
})
// 加入 middleware，驗證 request 登入狀態
router.post('/login', (req, res, next) => {
    const { email, password } = req.body
    
    if (!email || !password) {
        req.flash('error_msg', '信箱或密碼欄位不可空白。')
    }

    next()
}, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}))

// 註冊區塊
router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!email || !password || !confirmPassword) {
        errors.push({ message: '必填欄位不可為空。' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認密碼不相符！' })
    }
    if (errors.length) {
        return res.render('register', {
            errors,
            email,
            password,
            confirmPassword
        })
    }
    // 檢查是否註冊
    User.findOne({ email }).then(user => {
        // 若已註冊－退回原頁
        if (user) {
            errors.push({ message: '這個 Email 已經註冊過了。' })
            return res.render('register', {
                errors,
                name,
                email,
                password,
                confirmPassword
            })
        }
        return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => User.create({
                name,
                email,
                password: hash 
            }))
            .then(() => res.redirect('/users/login'))
            .catch(err => console.log(err))
    })
        .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', '已成功登出。')
    res.redirect('/users/login')
})

module.exports = router