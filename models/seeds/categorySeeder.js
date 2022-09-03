const Category = require('../category')
const db = require('../../config/mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const CATEGORY = {
  家居物業: "fa-house",
  交通出行: "fa-van-shuttle",
  休閒娛樂: "fa-face-grin-beam",
  餐飲食品: "fa-utensils",
  其他: "fa-pen"
}
const boolean = false

db.once('open', () => {
  const categoryId = Category._id
  const keys = Object.keys(CATEGORY)
  const values = Object.values(CATEGORY)
  
  return Promise.all(Array.from({
    length: Object.keys(CATEGORY).length
  }, (_, i) => Category.create({ name: keys[i], icon: values[i], boolean, categoryId })) 
  )
  .then(() => {
    console.log('done.')
    process.exit()
  })
  

  
})

// 