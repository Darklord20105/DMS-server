const User = require("../models/userModel");

exports.user_list = (req, res) => {
  User.find({})
    .then((data) => {
	    res.send(data) 
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.user_view = (req, res) => {
  const id = req.params.id
  console.log(id)

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "couldn't found a User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
    
};

exports.user_delete = (req, res) => {
  console.log(req.params.id);

  const id = req.params.id
  User.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch((err) => console.log("Error occured, " + err));
    
};

exports.user_create = (req, res) => {
  console.log(req.body);
  let { name, jobTitle } = req.body;

  const user = new User({
    name: name,
    jobTitle: jobTitle,
    debtList: [],
    paymentList: [],
  });
  
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating user."
      });
    });
};






// With a JSON doc
/* 
Person.
  find({
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
  }).
  limit(10).
  sort({ occupation: -1 }).
  select({ name: 1, occupation: 1 }).
  exec(callback);

// Using query builder
Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).
  sort('-occupation').
  select('name occupation').
  exec(callback);
  

Tank.create({ size: 'small' }, function (err, small) {
  if (err) return handleError(err);
  // saved!
});

// or, for inserting large batches of documents
Tank.insertMany([{ size: 'small' }], function(err) {

});
*/
