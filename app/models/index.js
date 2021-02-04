//const dbConfig = require('../config/db.config.js');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

//const truc = "mongodb+srv://root:toor@cluster1.9jij8.mongodb.net/MyFit?retryWrites=true&w=majority"
db.url = process.env.MANGODB_URL;
//db.url = dbConfig.url;

//db models
db.user = require("./user.model.js")(mongoose);
db.programme = require("./programme.model.js")(mongoose);

module.exports = db;