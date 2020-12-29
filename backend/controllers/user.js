import { collection } from '../dbconfig.js'
import mongodb from 'mongodb'
const { ObjectID } = mongodb

export const getAllUsers = (req, res) => {
  collection
    .find({})
    .project({ password: 0 })
    .toArray((err, data) => {
      res.json(data)
    })
}

export const getUser = (req, res) => {
  const id = new ObjectID(req.params.id)

  collection
    .find(id)
    .project({ password: 0 })
    .toArray((err, data) => {
      res.json(data)
    })
}

export const addUser = (req, res) => {
  let newUser = req.body
  collection
    .insertMany([newUser])
    .then((result) => {
      res.json({
        status: 'success',
        message: "User's details added successfully!",
      })
    })
    .catch((err) => {
      res.json({
        status: 'failed',
        message: "User's details were not added to the database",
        updated: data[0],
      })
    })
}

export const updateUser = (req, res) => {
  let id = new ObjectID(req.params.id)

  collection.updateOne(
    { _id: id },
    {
      $set: {
        ...req.body,
      },
    },
    (err, result) => {
      if (err) {
        console.error('User details updated failed!')
        res.status(500).json({
          message: 'User details updation failed!',
          stack: err,
        })
        return
      }
      if (result.modifiedCount > 0) {
        collection.find(id).toArray((err, data) => {
          res.json({
            status: 'success',
            message: "User's details updated successfully!",
            updated: data[0],
          })
        })
      } else {
        res.json({
          message: "User's details not modified",
        })
      }
    }
  )
}

export const deleteUser = (req, res) => {
  let id = new ObjectID(req.params.id)

  collection
    .deleteOne({ _id: id })
    .then((result) => {
      res.json({
        status: 'success',
        message: "User's details deleted successfully!",
        result: result,
      })
    })
    .catch((err) => {
      res.status(500).json({
        status: 'failed',
        message: "User's details deletion failed!",
        stack: err,
      })
    })
}
