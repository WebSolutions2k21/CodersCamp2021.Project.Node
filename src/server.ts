import express from 'express'

const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const port = 3000

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true},
  ()=> console.log('connected to db'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
