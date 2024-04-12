const express = require("express");
const { connectDB } = require("./dbConnection");
const cardRouter = require("./routers/router");

const app = express();
const port = process.env.PORT || 3000;

// Connect to Mongodb
connectDB()
  .then(() => {
    
    app.use(express.static(__dirname + '/public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // routes
    app.use('/api/cards', cardRouter);

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  });
