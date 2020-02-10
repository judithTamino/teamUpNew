console.log('app is loading');

const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
const bodyParser = require('body-parser');
const teamUpModule = require('./User');
const path = require ('path');

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
    // teamUpModule.interestsTOarray(req,res);
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
app.get('/users/userHomePage/:userEmail', (req, res) => {
    teamUpModule.findUserByEmail(req, res);
});

// Find user intrests
app.get ('/users/findUserInterst/:userEmail', (req, res) => {
    teamUpModule.findUserInterst(req, res);
});

////////////////// upload profile photo
app.post('/users/userHomePage', upload.single('imgFile'), (req, res) => {
    teamUpModule.upLoadPhoto(req, res);
});

app.get ('/users/userHomePage/:newFileName', (req, res) => {
    console.log ('/users/userHomePage/:newFileName is accessed');

    const fullPathFileName = path.join (__dirname, uploadDirectory, req.params.newFileName);
    res.sendFile (fullPathFileName);
});

////////////////// Groups
app.get ('/groups/:userEmail', (req, res) => {
    teamUpModule.getAllManagerGroups(req, res);
});

app.delete ('/groups/:id', (req, res) => {
    teamUpModule.deleteGroup (req, res);
});

app.patch ('/groups/editGroup/:id', (req, res) => {
    teamUpModule.editGroup (req, res);
});

app.get ('/groups/getGroupByCategory/:categoryId', (req, res) => {
    teamUpModule.getGroupByCategory (req, res);
});

app.get ('/groups/findGroupById/:id', (req, res) => {
    teamUpModule.findGroupById(req, res);
});

app.get('/groups/findMembersInGroup/:id', (req, res) => {
    teamUpModule.findMembersInGroup(req, res);
});


////////////////// Categories
app.get ('/categories/getCategories', (req, res) => {
    teamUpModule.getCategories(req, res);
});

app.get ('/categories/findCategoryById/:id', (req, res) => {
    teamUpModule.findCategoryById(req, res);
});


app.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`);
});