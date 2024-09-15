const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const app = express();
app.use(cors());

//app.use(bodyParser.json({ limit: '50mb' })); // You can adjust this size as necessary
//app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Adjust limit if using urlencoded data

routes(app);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
