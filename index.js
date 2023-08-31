const express = require("express");
const cors = require("cors");
const app = express();
const dbConnection = require("./config/dbConfig.js");
const path = require("path");
const _ = require("./routes");

// Database Connection:
dbConnection();

const port = process.env.PORT || 8000;

// Middleware:
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(_);
app.listen(port, () => console.log(`PORT IS RUNNING ON ${port}`));
