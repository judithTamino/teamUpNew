const mongoose = require('mongoose');
const path = require ('path');


mongoose.connect("mongodb://localhost:27017/TeamUp", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    city: String,
    state: String,
    joiningDate: String,
    interests: Array,
    groups: Array,
    profileImage: Buffer
});

const GroupSchema = new mongoose.Schema({
    groupManager: String,
    groupName: String,
    street: String,
    streetNumber: Number,
    city: String,
    date: String,
    startTime: String,
    endTime: String,
    category: String,
    topic: String,
    description: String,
    joiningDate: String,
    status: String
});

const User = mongoose.model("users", UserSchema);
const Group = mongoose.model('groups', GroupSchema);

function upLoadPhoto(req, res) {
    res.status(201).send({body:req.body, file:req.file} );
    // const userImage = {$set: {profileImage: req.file}} ;
    // const userEmail =  {email: req.body.email};

    // User.updateOne (userEmail, userImage, (err, req) => {
    //     if (err) {
    //         res.send (err)
    //     } else {
    //         res.status(201).send(req.body, req.file)
    //     }
    // });
}

function getProfileImage (req, res) {
    const FullFileName = path.join (__dirname, 'users/', req.params.filename);
    res.send (FullFileName);  
}

function findUserByEmail(req, res) {
    User.find((err, users) => {
        if (err) {
            res.status(500).send(err)
            return;
        }
        res.status(200).send(users)
    })
}

function createGroup(req, res) {
    const group = req.body;
    const groupObj = new Group({
        groupManager: group.groupManager,
        groupName: group.groupName,
        street: group.street,
        streetNumber: group.streetNumber,
        city: group.city,
        date: group.date,
        startTime: group.startTime,
        endTime: group.endTime,
        category: group.category,
        topic: group.topic,
        description: group.description,
        joiningDate: group.joiningDate,
        status: group.state
    });

    groupObj.save();
    res.status(201).send(groupObj);
}

function registration(req, res) {
    const user = req.body;

    const userObj = new User({
        name: user.name,
        email: user.email,
        password: user.password,
        city: user.city,
        state: user.state,
        joiningDate: user.joiningDate,
        interests: user.interests,
        groups: user.groups,
        profileImage: user.profileImage
    });

    User.findOne({
        email: userObj.email
    }, function (err, obj) {
        if (err) console.log(err);
        if (obj !== null) {
            res.status(403).send('already exists');
        } else {
            console.log(obj);
            userObj.save();
            res.status(201).send(userObj);
        }
    })
}

function login(req, res) {
    const user = req.body;

    User.findOne({
        email: user.email,
        password: user.password
    }, function (err, obj) {
        if (err) {
            console.log(err);
        } else if (obj) {
            return res.status(200).send(obj);
        } else {
            return res.sendStatus(404);
        }
    })
}



module.exports.registration = registration;
module.exports.login = login;
module.exports.createGroup = createGroup;
module.exports.findUserByEmail = findUserByEmail;
module.exports.upLoadPhoto = upLoadPhoto;
module.exports.getProfileImage = getProfileImage;