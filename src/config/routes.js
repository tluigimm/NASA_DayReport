const express = require('express')

module.exports = (server) => {
  const router = express.Router()
  server.use(router)
  router.get('/', (req, res, next) => res.status(200).json({message: "API FUNCIONANDO /o/"}))

}
