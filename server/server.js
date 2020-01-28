console.log ('app is loading');

const express = require ('express');
const PORT = process.env.PORT || 5000;
const app = express ();
const bodyParser = require('body-parser');
const teamUpModule = require('./User');

app.use (express.json());
app.use (bodyParser.urlencoded ({extended:true}));


app.post ('/users/register', (req, res) => {
    teamUpModule.registration (req, res);
});

app.post ('/users/login', (req, res) => {
    teamUpModule.login (req, res);
});

app.post ('/groups/createGroup', (req, res) => {
    teamUpModule.createGroup (req, res);
});

app.get ('/users/userHomePage', (req, res) => {     
    teamUpModule.findUserByEmail (req, res);
});




app.listen (PORT, () => {
    console.log (`server is up on port ${PORT}`);
});