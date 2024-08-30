const jwt = require("jsonwebtoken");
const verifyToken = (token) => {
  console.log(process.env.SECRET);
  try {
    const resJwt = jwt.verify(token, process.env.SECRET);
    if (resJwt) {
      return resJwt;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err.message);
    // throw Error('Authentication Error : ' + err.message);
    return false;
  }
};

module.exports = { verifyToken };
