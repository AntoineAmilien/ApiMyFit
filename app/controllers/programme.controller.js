const model = require("../models");
const Programme = model.programme;


// Create and Save a new programme
exports.create = (req, res) => {

  // Validate request
  if (!req.body.intitule) {
    res.status(400).send({ message: "L'intitule est vide" });
    return;
  }

  // Create a Programme
  const programme = new Programme({
    intitule: req.body.intitule,
    fk_typeProgrammeId: req.body.fk_typeProgrammeId
  });

  // Save Programme in the database
  programme
    .save(programme)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Il y a une erreur pendant la création du programme."
      });
    });
};

// Retrieve all programmes from the database.
exports.findAll = (req, res) => {

  Programme.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "xd"
      });
    });
};

// Update a programme by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Programme.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de modifier le programme avec l'id : ${id}.`
        });
      } else res.send({ message: "Programme modifié avec succés" });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error impossible de modifier le programme avec l'id : " + id
      });
    });
};

// Delete a programme with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Programme.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de supprimer le programme avec l'id : ${id}.`
        });
      } else {
        res.send({
          message: "Programme supprimé avec succés"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error impossible de supprimer le programme avec l'id : " + id
      });
    });
};