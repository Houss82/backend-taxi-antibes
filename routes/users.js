var express = require("express");
var router = express.Router();
const User = require("../models/users");

// POST - Créer une nouvelle réservation
router.post("/reservation", async (req, res) => {
  try {
    const newUser = new User({
      nom: req.body.nom,
      indicatifPays: req.body.indicatifPays || "+33",
      telephone: req.body.telephone,
      email: req.body.email,
      date: req.body.date,
      heure: req.body.heure,
      adresseDepart: req.body.adresseDepart,
      adresseArrivee: req.body.adresseArrivee,
      nombreBagages: req.body.nombreBagages,
      nombrePassagers: req.body.nombrePassagers,
      commentaires: req.body.commentaires,
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      result: true,
      message: "Réservation créée avec succès",
      reservation: savedUser,
    });
  } catch (error) {
    res.status(400).json({
      result: false,
      error: error.message,
    });
  }
});

// GET - Récupérer toutes les réservations
router.get("/reservations", async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      result: true,
      count: users.length,
      reservations: users,
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      error: error.message,
    });
  }
});

// GET - Récupérer une réservation par ID
router.get("/reservation/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        result: false,
        message: "Réservation non trouvée",
      });
    }
    res.json({
      result: true,
      reservation: user,
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      error: error.message,
    });
  }
});

// DELETE - Supprimer une réservation
router.delete("/reservation/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({
        result: false,
        message: "Réservation non trouvée",
      });
    }
    res.json({
      result: true,
      message: "Réservation supprimée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      error: error.message,
    });
  }
});

module.exports = router;
