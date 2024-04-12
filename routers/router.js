const express = require("express");
const { addCardController, getAllCardsController } = require("../controllers/controller");

const router = express.Router();

// Route to create a new card
router.post("/", addCardController);

// Route to retrieve all cards
router.get("/", getAllCardsController);

module.exports = router;
