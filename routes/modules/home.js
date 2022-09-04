const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

//首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  const all = true
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(category => {
      Record.find({ userId })
        .lean()
        .then(record => {
          let totalAmount = 0
          for (const records of record) {
            const date = records.date.toISOString().slice(0, 10)
            totalAmount += records.amount
            records.date = date
          }
          res.render('index', { record, totalAmount, category, all })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

//類別篩選
router.get('/category', (req, res) => {
  const userId = req.user._id
  const categoryId = req.query.category_id

  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(category => {
      if (categoryId === 'all') {
        res.redirect('/')
      } else {
        Record.find({ categoryId, userId })
          .lean()
          .then(record => {
            let totalAmount = 0
            //取得date,totleAmount的資料
            for (const records of record) {
              const date = records.date.toISOString().slice(0, 10)
              totalAmount += records.amount
              records.date = date
            }
            //取得category的資料，顯現類別清單
            for (const categorys of category) {
              if (categoryId.toString() === (categorys._id).toString()) {
                categorys.boolean = true
              } else {
                categorys.boolean = false
              }
            }
            res.render('index', { record, totalAmount, category })
          })
          .catch(err => console.log(err))

      }

    })
    .catch(err => console.log(err))
})

module.exports = router
