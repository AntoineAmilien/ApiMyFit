const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.url = process.env.MANGODB_URL;

//db models
db.user = require("./user.model.js")(mongoose);
db.programme = require("./programme.model.js")(mongoose);

module.exports = db;