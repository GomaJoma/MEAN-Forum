const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const app = express();
const config = require('./config/db');
const account = require('./routes/account');
const home = require('./routes/home');
const Post = require('./models/post');

const port = process.env.PORT || 8080;


app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.db , {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
  console.log("You successfuly connected to DataBase");
});
mongoose.connection.on('error', (err) => {
  console.log("Couldn't connect to DataBase: " + err);
});
mongoose.set('useFindAndModify', false);

app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('/', home);
app.use('/account', account);

app.listen(port, () => {
  console.log("Server successfuly started on port: " + port);
});
