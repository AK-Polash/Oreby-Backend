const express = require("express");
const cors = require("cors");
const app = express();
const dbConnection = require("./config/dbConfig.js");
const path = require("path");
const _ = require("./routes");

// Database Connection:
dbConnection();

// Middleware:
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(_);
app.listen(8000);
