const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // to connect to mongo db database
// const bodyParser = require('body-parser'); included in express.json

require('dotenv').config(); //to create private variables

//creating express server
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());    //cors middleware
app.use(express.json());    //to parse json



//uri is supposed to be got from mongo atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

// mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
//     console.log("mongodb is connected");
// }).catch((error)=>{
//     console.log("mondb not connected");
//     console.log(error);
// });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//to start server
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});