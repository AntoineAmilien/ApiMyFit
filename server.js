const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//connexion a mangoDb
//const db = require("./app/models");

var corsOptions = {
  origin: "*"
};

//USING
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const mangoUrl = process.env.MANGODB_URL 
mongoose.connect(mangoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// Declaration du fichier avec les routes personalisées pour le controller tutoriel
require("./app/routes/programme.routes")(app);
require("./app/routes/user.routes")(app);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to myfit application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});