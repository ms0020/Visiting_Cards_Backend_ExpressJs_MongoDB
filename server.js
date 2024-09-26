const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const routes = require('./index.js')
const setupSwagger = require('./swagger.js');

dotenv.config();

mongoose.set('strictQuery', true);

mongoose.connect(
  process.env.DB_CONNECT || 'mongodb://localhost:27017/visitingcards',
  { useUnifiedTopology: true, useNewUrlParser: true }
).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is running on the specified port');
});

setupSwagger(app);

// For Authentication
const authentication = require('./middleware/authMiddleware.js');
app.use(authentication);

app.use(routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});