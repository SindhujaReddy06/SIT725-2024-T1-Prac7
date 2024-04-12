const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = "mongodb+srv://s223671346:URWpYJTDM2V7zu9h@cluster1.1ktvqaj.mongodb.net/?retryWrites=true&w=majority";

// MongoDB client instance and collection
let client;
let collection;

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Connect to MongoDB
        client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        // Set the collection
        collection = client.db().collection('birds'); 

        // Check if the collection is empty and insert initial data if it is
        const count = await collection.countDocuments();
        if (count === 0) {
            await collection.insertMany([
                {
                    title: "Bird 2",
                    image: "images/bird2.png",
                    link: "About Bird 2",
                    description: "Hey! You can call us Scarlet Macaw"
                },
                {
                    title: "Bird 3",
                    image: "images/bird3.png",
                    link: "About Bird 3",
                    description: "Hey!! I am an Eagle"
                }
            ]);
            console.log("Initial bird data inserted into MongoDB");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Throw error to handle it in the calling code
    }
};

// Function to get the MongoDB client instance
const getClient = () => {
    if (!client) {
        throw new Error('MongoDB connection not established');
    }
    return client;
};

module.exports = { connectDB, getClient };
