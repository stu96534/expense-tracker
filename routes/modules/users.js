const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../../models/user')

//登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

//使用者登入
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

//註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

//使用者註冊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位是必填的。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '這個Email已經註冊過了。' })
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
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router
