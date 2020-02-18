const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var multer = require('multer');
const uploadDirectory = 'profileImg/';
var upload = multer({dest:uploadDirectory});

mongoose.connect("mongodb://localhost:27017/TeamUp", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
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
  profileImage: String
});

const GroupSchema = new mongoose.Schema({
  groupManager: String,
  members: Array,
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
  groupStatus: String
});

const CategoriesSchema = new mongoose.Schema({
  name: String,
  groups: Array
});

const ImageSchema = new mongoose.Schema({
  image: {data: Buffer, contentType: String}
});

const User = mongoose.model("users", UserSchema);
const Group = mongoose.model("groups", GroupSchema);
const Categories = mongoose.model("categories", CategoriesSchema);
const Image = mongoose.model("image", ImageSchema);

function uploadProfileImage(req, res) {

}

module.exports.uploadProfileImage=uploadProfileImage;
// function uploadPhoto(req, res) {
//   res.status(201).send({body:req.body, file:req.file} );

//   const userImage = {$set: {profileImage: req.file.filename}};
//   const userEmail =  {email: req.body.email};

//   User.updateOne (userEmail, userImage, (err) => {
//       if (err) {
//           res.send (err)
//       } else {
//           res.status (200)
//       }
//   });
// }

function updateStatus(req, res) {
  Group.findOneAndUpdate({_id: new mongoose.Types.ObjectId(`${req.params.id}`)}, {groupStatus:req.params.status},
  function (err) {
    if (err) {
      res.status(404).send(err)
    } else {
      res.sendStatus(200);
    }
  });
}

function findUserGroups(req, res) {
  User.findOneAndUpdate({ email: req.params.userEmail }, {$push:{groups:req.params.groupId}}, function(err) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.sendStatus(200);
    }
  });
}

function exitGroup(req, res) {
  const groupId = {
    _id: new mongoose.Types.ObjectId(`${req.params.id}`)
  };
  const member = {
    $pull: { members: req.body }
  };
  Group.updateOne (groupId, member, (err) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });
}


function exitGroupUserSide(req, res) {
  User.findOneAndUpdate({ email: req.params.userEmail }, {$pull:{groups:req.params.groupId}}, function(err) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.sendStatus(200);
    }
  });
}


function findUserByEmail(req, res) {
  User.find({ email: req.params.userEmail }, function(err, user) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(user);
    }
  });
}

function editGroup(req, res) {
  const groupId = {
    _id: new mongoose.Types.ObjectId(`${req.params.id}`)
  };
  const newValues = {
    $set: {
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      street: req.body.street,
      streetNumber: req.body.streetNumber,
      city: req.body.city,
      groupName: req.body.groupName
    }
  };
  Group.updateOne(groupId, newValues, err => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.sendStatus(200);
    }
  });
}

function editProfile(req, res) {
  const profileId = {
    email:req.params.email
  }
  const newValues = {
    $set: {
      city: req.body.city,
      state: req.body.state,
      password: req.body.password
    }
  };
  User.updateOne(profileId, newValues, err => {
    if (err) {
      res.status(404).send(err);
    }
    else {
      res.sendStatus(200);
    }
  });
}

function deleteGroup(req, res) {
  Group.deleteOne(
    {
      _id: new mongoose.Types.ObjectId(`${req.params.id}`)
    },
    function (err) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.sendStatus(200);
      }
    }
  );
}

function getAllManagerGroups(req, res) {
  Group.find(
    {
      groupManager: req.params.userEmail
    },
    function (err, arrGroups) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(arrGroups);
      }
    }
  );
}

function getGroupByCategory(req, res) {
  Group.find(
    {
      category: req.params.categoryId
    },
    function(err, groups) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(groups);
      }
    }
  );
}

function findGroupById(req, res) {
  Group.findOne(
    {
      _id: new mongoose.Types.ObjectId(`${req.params.id}`)
    },
    function(err, group) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(group);
      }
    }
  );
}

function findMembersInGroup(req, res) {
  Group.findOne(
    {
      _id: new mongoose.Types.ObjectId(`${req.params.id}`)
    },
    function(err, group) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(group.members);
      }
    }
  );
}

function updateGroupsMembers (req, res) {
  const groupId = {
    _id: new mongoose.Types.ObjectId(`${req.params.id}`)
  };
  const newMember = {
    $push: { members: req.body }
  };
  Group.updateOne (groupId, newMember, (err) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });
}

function createGroup(req, res) {
  const group = req.body;
  const groupObj = new Group({
    groupManager: group.groupManager,
    members: group.members,
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
    groupStatus: group.groupStatus
  });

  groupObj.save();
  res.sendStatus(201);
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

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(userObj.password, salt, function (err, hash) {
        userObj.password = hash;
        userObj.save();
        res.status(201).send(userObj);
    });
})
}

function login  (req, res) {
  const getUser = req.body;
  const findUser =  User.findOne({ email: getUser.email}).select('_id password firstName lastName email')
  if (findUser) {
    findUser.exec((err, user) => {
          bcrypt.compare(getUser.password, user.password, function (err, isMatch) {
              if (err) {
                  console.log(err);
              }
              else if (isMatch) {
                  res.send(user)
              } else {
                  res.sendStatus(404);
              }
          })
      })
  }
}

function findUserInterst(req, res) {
  User.findOne (
    { email: req.params.userEmail },
    function (err, arrIntrests) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.send(arrIntrests.interests);
      }
    }
  )
}

function getCategories(req, res) {
  Categories.find((err, categories) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(categories);
    }
  });
}

function findCategoryById(req, res) {
  Categories.findOne(
    {
      _id: new mongoose.Types.ObjectId(`${req.params.id}`)
    },
    function(err, category) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(category);
      }
    }
  );
}

module.exports.registration = registration;
module.exports.login = login;
module.exports.createGroup = createGroup;
module.exports.findUserByEmail = findUserByEmail;
module.exports.getAllManagerGroups = getAllManagerGroups;
module.exports.deleteGroup = deleteGroup;
module.exports.editGroup = editGroup;
module.exports.findUserInterst = findUserInterst;
module.exports.getCategories = getCategories;
module.exports.getGroupByCategory = getGroupByCategory;
module.exports.findCategoryById = findCategoryById;
module.exports.findGroupById = findGroupById;
module.exports.findMembersInGroup = findMembersInGroup;
module.exports.updateGroupsMembers = updateGroupsMembers;
module.exports.editProfile = editProfile
module.exports.findUserGroups=findUserGroups;
module.exports.updateStatus=updateStatus;
module.exports.exitGroup=exitGroup;
module.exports.exitGroupUserSide=exitGroupUserSide;


