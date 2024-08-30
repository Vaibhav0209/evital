const express = require("express");
const app = express();
require("./db/conn");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const router = require("./router");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log("server started at port 5000");
});
