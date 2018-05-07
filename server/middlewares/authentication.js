const jwt = require('jsonwebtoken');

module.exports = {

  authentication(req, res, next){

    const decoded = jwt.decode(req.headers.token)

    if (!decoded) {
      res.status(404).json('you are not login')
    } else {
      next()
    }

  }

};
