import express from 'express'
import mongo from 'mongodb'
import { getConnection } from './dbconfig.js'

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

getConnection('sample', 'users')

const app = express()
const port = 5000
const { ObjectID } = mongo

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, Authorization'
  )
  next()
})

app.use('/users', userRoutes)
app.use('/signin', authRoutes)

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Route does not exist',
  })
})

// Error handling for jwt authentication
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      status: 'failed',
      message:
        'Authentication failed! Invalid token. Please log in to continue',
      stack: err,
    })
  }
  next()
})

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`)
})
