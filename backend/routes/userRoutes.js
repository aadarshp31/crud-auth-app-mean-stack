import express from 'express'
import { isSignedIn } from '../controllers/auth.js'
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/user.js'
const router = express.Router()

router.get('/', isSignedIn, getAllUsers)

router.get('/:id', getUser)

router.post('/', addUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

export default router
