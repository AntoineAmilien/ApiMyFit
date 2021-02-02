const model = require("../models");
const User = model.user;

// Create and Save a new User
exports.create = (req, res) => {


  console.log("req.body = " + req.body.nom);
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Eleve
  const user = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    password: req.body.password,
  });

  // Save Eleve in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Il y a une erreur pendant la création de l'utilisateur."
      });
    });
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {

    const nom = req.query.nom;
    var condition = nom ? { title: { $regex: new RegExp(nom), $options: "i" } } : {};

    User.find(condition)
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

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Eleve introuvable par l'id :  " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Il y a une erreur pendant la récupération de l'éleve avec l'id : " + id });
      });
  };

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de modifier l'éleve avec l'id : ${id}.`
        });
      } else res.send({ message: "Eleve modifié avec succés" });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error impossible de modifier l'éleve avec l'id : " + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Impossible de supprimer l'éleve avec l'id : ${id}.`
          });
        } else {
          res.send({
            message: "Eleve supprimé avec succés"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error impossible de supprimer l'éleve avec l'id : " + id
        });
      });
  };

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Eleves supprimés avec succés`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error impossible de supprimer tout les eleves"
      });
    });
};

// Find utilisateur by login values
exports.findAllByLogin = (req, res) => {
    User.find({ email: req.body.email, password : req.body.password })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error impossible de rechercher l'utilisateur par son email et son password"
        });
      });
  };
