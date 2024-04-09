const express = require("express");
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
const uri = "mongodb+srv://s223671346:URWpYJTDM2V7zu9h@cluster1.1ktvqaj.mongodb.net/?retryWrites=true&w=majority";

let collection;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('birds'); 
        console.log("Connected to MongoDB");

        
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
    } catch (ex) {
        console.error("Error connecting to MongoDB:", ex);
    }
}

runDBConnection().catch(console.error);

app.post('/api/cards', async (req, res) => {
    try {
        const newCard = req.body;
        const result = await collection.insertOne(newCard);
        console.log("New card added:", newCard);
        res.json({ success: true, message: 'Card added successfully' });
    } catch (error) {
        console.error("Error adding card:", error);
        res.status(500).json({ success: false, message: 'Failed to add card' });
    }
});

app.get('/api/cards', async (req, res) => {
    try {
        const cards = await collection.find({}).toArray();
        res.json({ success: true, data: cards });
    } catch (error) {
        console.error("Error fetching cards:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch cards' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
