const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
 
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userdata = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Auth  Failed",
    });
  }
};
