const mongoose = require("mongoose");

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

const CategoriesSchema = new mongoose.Schema ({
  name:String,
  groups: Array
});

const User = mongoose.model("users", UserSchema);
const Group = mongoose.model("groups", GroupSchema);
const Categories = mongoose.model("categories", CategoriesSchema);



function upLoadPhoto(req, res) {
  res.status(201).send({
    body: req.body,
    file: req.file
  });

  const userImage = {
    $set: {
      profileImage: req.file.filename
    }
  };
  const userEmail = {
    email: req.body.email
  };

  User.updateOne(userEmail, userImage, err => {
    if (err) {
      res.send(err);
    } else {
      res.status(200);
    }
  });
}

function findUserByEmail(req, res) {
  User.find ({email: req.params.userEmail}, function (err, user) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(user);
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

  Group.updateOne (groupId, newValues, err => {
      if (err) {
          res.status(404).send(err);
      } else {
          res.sendStatus(200);
      }
  });
}

function deleteGroup(req, res) {
  Group.deleteOne(
    {
      _id: new mongoose.Types.ObjectId(`${req.params.id}`)
    },
    function(err) {
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
    function(err, arrGroups) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(arrGroups);
      }
    }
  );
}

function getGroupByCategory(req, res) {
  Group.find (
    {
      category:req.params.categoryId
    }, function (err, groups) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(groups);
      }
    }
  );
}

function findGroupById(req, res) {
  Group.findOne (
    {
      _id: new mongoose.Types.ObjectId(`${req.params.id}`)
    }, function (err, group) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(group);
      }
    }
  );
}

function findMembersInGroup(req, res) {
  Group.findOne (
    {
      _id: new mongoose.Types.ObjectId(`${req.params.id}`)
    }, function (err, group) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(group.members);
      }
    }
  )
}

function updateGroupMembers(req, res) {
  // const groupId = {
  //   _id: new mongoose.Types.ObjectId(`${req.params.id}`)
  // };

  // const newValues = {
  //     $set: {
  //         date: req.body.date,
  //         startTime: req.body.startTime,
  //         endTime: req.body.endTime,
  //         street: req.body.street,
  //         streetNumber: req.body.streetNumber,
  //         city: req.body.city,
  //         groupName: req.body.groupName
  //     }
  // };

  // Group.updateOne (groupId, newValues, err => {
  //     if (err) {
  //         res.status(404).send(err);
  //     } else {
  //         res.sendStatus(200);
  //     }
  // });

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

  User.findOne(
    {
      email: userObj.email
    },
    function(err, obj) {
      if (err) console.log(err);
      if (obj !== null) {
        res.status(403).send("already exists");
      } else {
        console.log(obj);
        userObj.save();
        res.status(201).send(userObj);
      }
    }
  );
}

function login(req, res) {
  const user = req.body;

  User.findOne(
    {
      email: user.email,
      password: user.password
    },
    function(err, obj) {
      if (err) {
        console.log(err);
      } else if (obj) {
        return res.status(200).send(obj);
      } else {
        return res.sendStatus(404);
      }
    }
  );
}

function findUserInterst (req, res) {
  User.findOne (
    {email: req.params.userEmail},
    function (err, arrIntrests) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(arrIntrests.interests);
      }
    }
  );
}

function getCategories (req, res) {
  Categories.find ((err, categories) =>{
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(categories);
    }
  });
}

function findCategoryById (req, res) {
  Categories.findOne (
    {
      _id: new mongoose.Types.ObjectId(`${req.params.id}`)
    }, function (err, category) {
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
module.exports.upLoadPhoto = upLoadPhoto;
module.exports.getAllManagerGroups = getAllManagerGroups;
module.exports.deleteGroup = deleteGroup;
module.exports.editGroup = editGroup;
module.exports.findUserInterst=findUserInterst;
module.exports.getCategories=getCategories;
module.exports.getGroupByCategory=getGroupByCategory;
module.exports.findCategoryById=findCategoryById;
module.exports.findGroupById=findGroupById;
module.exports.findMembersInGroup=findMembersInGroup;

