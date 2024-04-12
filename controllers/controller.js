const { addCard, getAllCards } = require("../models/cards");

// Function to create new card
const addCardController = async (req, res) => {
    try {
        const newCard = req.body;
        const result = await addCard(newCard);
        res.json({ success: true, message: 'Card added successfully' });
    } catch (error) {
        console.error("Error adding card:", error);
        res.status(500).json({ success: false, message: 'Failed to add card' });
    }
};

// Function to retrieve all cards
const getAllCardsController = async (req, res) => {
    try {
        const cards = await getAllCards();
        res.json({ success: true, data: cards });
    } catch (error) {
        console.error("Error fetching cards:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch cards' });
    }
};

module.exports = { addCardController, getAllCardsController };
