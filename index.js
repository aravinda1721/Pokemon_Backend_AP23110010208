const express = require('express');
const dotenv = require('dotenv');
const server = express();
const Pokemon = require('./models/Pokemon')
const connectDatabase = require('./config/db');
const pokemonRoute = require("./router/pokemonRoute")
const authroute = require('./router/authRouter');
const { register } = require('./controller/authController');

dotenv.config();

server.use(express.json());
connectDatabase();

server.use("/api/v1",pokemonRoute)
server.use("/auth",authroute)

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
    console.log('server started on port ' + PORT);
});