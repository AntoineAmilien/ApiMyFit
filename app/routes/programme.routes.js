module.exports = app => {

    const programme = require("../controllers/programme.controller.js");
  
    var router = require("express").Router();
  
    // Create a new programme
    router.post("/",programme.create);

    // Retrieve all programme
    router.get("/", programme.findAll);

    // Update a programme with id
    router.put("/:id", programme.update);

    // Delete a programme with id
    router.delete("/:id", programme.delete);
  
    app.use('/api/programme', router);
  };