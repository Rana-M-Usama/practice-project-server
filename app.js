
const dotenv = require('dotenv')

dotenv.config({path: './config.env'});

const express = require("express");

const app = express();

const cors=require('cors');

const port = process.env.PORT;

app.use(cors({origin: 'http://localhost:3000'}));

app.listen(port, () => {
  console.log(`Server is running at ${port}`)
})

app.use(express.json()) ; 

app.use(require('./router/auth'));  









