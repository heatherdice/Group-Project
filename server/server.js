require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.OUR_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000"
}));

require("./config/mongoose.config");

const taskRoutes = require('./routes/task.routes');
taskRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );