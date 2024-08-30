const jwt = require("jsonwebtoken");
const authenticate = async (token) => {
  try {
    const tokenData = await jwt.verify(token, process.env.SECRET);
    if (tokenData) {
      return tokenData;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const validateTokenData = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const data = await authenticate(token);
      if (data) {
        req.user = data;
      } else {
        console.log("user does't exist");

        res.status(401).json({ message: "unauthorised" });
      }
    } else {
      console.log("token not sent");
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { validateTokenData };
