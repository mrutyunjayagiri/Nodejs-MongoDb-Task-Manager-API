const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async(req, res, next) => {
   try {
       const token = req.header('Authorization').replace('Bearer ', '')
       const decodedId = jwt.verify(token, process.env.JWT_SECRET_KEY)       
       const user = await User.findOne({_id: decodedId, 'tokens.token': token})
       
       if (!user) {
           throw new Error()
       }

       req.user = user
       req.token = token

       next()
   } catch (error) {
       res.status(401).send({"error": "Unauthorized access"})
   }
}

module.exports = auth