const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Recrod = require('../../models/record')

//新增頁面
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(category => {
      res.render('new', { category })
    })
    .catch(err => console.log(err))
})

//新增支出
router.post('/', (req, res) => {
  const userId = req.user._id
  const categoryId = req.body.category_id
  const { name, date, amount } = req.body
  const errors = []

  if (!name || !date || !amount) {
    errors.push({ message: '所有欄位是必填的。' })
  }
  if (errors.length) {
    return  Category.find()
      .lean()
      .sort({ _id: 'asc' })
      .then(category => {
        res.render('new', { errors, name, date, amount, category })
      })
      .catch(err => console.log(err))
  }

  Category.findOne({ _id: categoryId })
    .lean()
    .then((category) => {
      return Recrod.create({
        name, date, amount, icon: category.icon, categoryId, userId
      })
        .then(() => res.redirect('/'))
    })
    .catch(err => console.log(err))
})

//修改頁面
router.get('/:recordId/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.recordId
  Recrod.findOne({ _id, userId })
    .lean()
    .then(record => {
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(category => {

          const date = record.date.toISOString().slice(0, 10)

          for (const categorys of category) {
            if (record.categoryId.toString() === (categorys._id).toString()) {
              categorys.boolean = true
            } else {
              categorys.boolean = false
            }
          }
          res.render('edit', { record, category, date })
        })
    })
    .catch(err => console.log(err))

})

//修改支出
router.put('/:recordId', (req, res) => {
  const userId = req.user._id
  const categoryId = req.body.category_id
  const { name, date, amount } = req.body
  const _id = req.params.recordId
  const errors = []

  if (!name || !date || !amount) {
    errors.push({ message: '所有欄位是必填的。' })
  }
  if (errors.length) {
    return Recrod.findOne({ _id, userId })
      .lean()
      .then(record => {
        Category.find()
          .lean()
          .sort({ _id: 'asc' })
          .then(category => {

            record.name = name
            record.date = date
            record.amount = amount

            for (const categorys of category) {
              if (record.categoryId.toString() === (categorys._id).toString()) {
                categorys.boolean = true
              } else {
                categorys.boolean = false
              }
            }
            res.render('edit', {errors, record, category, date })
          })
      })
      .catch(err => console.log(err))
  }

  Category.findOne({ _id: categoryId })
    .then(category => {
      return Recrod.findOne({ _id, userId })
        .then(record => {
          record.name = name
          record.date = date
          record.amount = amount
          record.icon = category.icon
          record.categoryId = categoryId
          return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

//刪除支出
router.delete('/:recordId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.recordId

  Recrod.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
