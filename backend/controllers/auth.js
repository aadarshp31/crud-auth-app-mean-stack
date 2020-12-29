import { collection as User } from '../dbconfig.js'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'

export const signin = (req, res) => {
  // Destructuring email and password from the req.body
  let { email, password } = req.body
  email = email.toLowerCase()

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: 'User Email does not exists',
        })
      }
      if (user.password !== password) {
        return res.status(401).json({
          error: 'Password is incorrect',
        })
      }

      // Create authentication token
      const token = jwt.sign({ _id: user._id }, 'process.env.JWTSECRET', {
        expiresIn: 60 * 60,
      })

      // send response to the front end
      const { _id, name, email, age, gender, placeOfWork, qualification } = user
      return res.json({
        token,
        user: { _id, name, email, age, gender, placeOfWork, qualification },
      })
    })
    .catch((err) => {
      res.status(500).json({
        status: 'failed',
        message: 'Error occured while authenticating',
        stack: err,
      })
    })
}

//Protected Routes
export const isSignedIn = expressJwt({
  secret: process.env.JWTSECRET,
  userProperty: 'auth',
  algorithms: ['HS256'],
})
