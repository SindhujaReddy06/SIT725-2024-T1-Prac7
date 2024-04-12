const { getClient } = require("../dbConnection");

// Function to get the collection
const getCollection = () => {
    const client = getClient();
    return client.db().collection('birds');
};

// Function to add a new card
const addCard = async (newCard) => {
    try {
        const collection = getCollection();
        const result = await collection.insertOne(newCard);
        return result;
    } catch (error) {
        throw error;
    }
};

// Function to get all cards
const getAllCards = async () => {
    try {
        const collection = getCollection();
        const cards = await collection.find({}).toArray();
        return cards;
    } catch (error) {
        throw error;
    }
};

module.exports = { addCard, getAllCards };
