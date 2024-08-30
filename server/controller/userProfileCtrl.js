const connection = require("../db/conn");

exports.getUserInfo = (req, res) => {
  try {
    const { id } = req.user;
    connection.query(
      "SELECT email, mobile,dob,name,address,gender FROM users WHERE id=?",
      [id],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        } else if (result.length > 0) {
          return res
            .status(200)
            .json({ data: result[0], message: "data found" });
        } else {
          return res.status(404).json({ message: "user not found" });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};

exports.changeUserInfo = (req, res) => {
  try {
    const { id } = req.user;
    const { name, email, dob, mobile, gender, address } = req.body;
    connection.query(
      "UPDATE users SET name=?,email=?,dob=?,mobile=?,gender=?,address=? WHERE id=?",
      [name, email, dob, mobile, gender, address, id],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        if (result.affectedRows > 0) {
          return res.status(200).json({ message: "user profile changed" });
        } else {
          return res.status(404).json({ message: "user not found " });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};
