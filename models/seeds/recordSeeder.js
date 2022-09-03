const bcrypt = require('bcryptjs')
const Category = require('../category')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')
const Record = require('../record')

const records = require('./recordSeed.json')
const db = require('../../config/mongoose')
const password = '12345678'
const SEED_USER = [
  {
    name: '廣志',
    email: 'abcd@example.com',
  },
  {
    name: '小新',
    email: 'efgh@example.com',
  }
]

const CATEGORY = {
  家居物業: "fa-house",
  交通出行: "fa-van-shuttle",
  休閒娛樂: "fa-face-grin-beam",
  餐飲食品: "fa-utensils",
  其他: "fa-pen"
}

db.once('open', () => {

  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => User.create({
      name: SEED_USER[0].name,
      email: SEED_USER[0].email,
      password: hash
    },
      {
        name: SEED_USER[1].name,
        email: SEED_USER[1].email,
        password: hash
      })
    )
    .then(user => {

      return Promise.all([createRecord(1, user[0]), createRecord(2, user[0]), createRecord(3, user[0]), createRecord(4, user[1]), createRecord(5, user[0])])
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })

})



function createRecord(id, users) {
  let icon
  Object.entries(CATEGORY).forEach(([key, value]) => {
    if (records[(id - 1)].category === key) {
      icon = value
    }
  })


  return Category.findOne({ icon })
    .lean()
    .then(category => {

      return Record.create({
        name: records[(id - 1)].name, date: records[(id - 1)].date, amount: records[(id - 1)].amount, icon,
        userId: users._id, categoryId: category._id
      })

    })
    .catch(err => console.log(err))


}