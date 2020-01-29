console.log('app is loading');

const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
const bodyParser = require('body-parser');
const teamUpModule = require('./User');

const multer = require('multer');
const uploadDirectory = 'profileImg/';
var upload = multer({
    dest: uploadDirectory 
});

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Register
app.post('/users/register', (req, res) => {
    teamUpModule.registration(req, res);
});

// Login
app.post('/users/login', (req, res) => {
    teamUpModule.login(req, res);
});

// Create Group
app.post('/groups/createGroup', (req, res) => {
    teamUpModule.createGroup(req, res);
});

// Find user by email
app.get('/users/userHomePage', (req, res) => {
    teamUpModule.findUserByEmail(req, res);
});

// upload profile photo
app.post('/users/userHomePage', upload.single('imgFile'), (req, res) => {
    // console.log (req.body.email);
    // console.log (req.file);
    teamUpModule.upLoadPhoto(req, res);
});
app.get('/profileImg/:filename', (req, res) => {
    teamUpModule.getProfileImage(req, res);
})

app.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`);
});