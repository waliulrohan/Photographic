const jwt = require('jsonwebtoken');

async function checkLogin(req, res, next) {
   const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
 
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({
    error :"invalid token"
      });
    }
  } else {
    res.status(401).json({

          message: "Missing token",

    });
  }
}

module.exports = {
  checkLogin,
};
