const { JWT_SECRET } = require("./config");

const jwt = require("jsonwebtoken");

function middleware(req, res, next) {

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.json({ message: "You are unauthorized" });
    return;
  }
  
  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (decodedToken) {
      req.userId = decodedToken.userId;
      next();
    }
  } catch (e) {
        res.json({ message: "Wrong token" });
        return
  }
}


module.exports={middleware}