const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const middleWare = [morgan("dev"), cors(), express.json()]

module.exports = middleWare