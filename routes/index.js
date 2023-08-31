const express = require("express");
const _ = express.Router();
const apiRoutes = require("./api");

const api = process.env.BASE_URL;

_.use(api, apiRoutes);
_.get(api, (req, res) => res.send({ error: "No API found on this route" }));

module.exports = _;
