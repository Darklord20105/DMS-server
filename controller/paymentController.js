const User = require("../models/userModel");

exports.payment_get_all = (req, res) => {
  console.log(req.body);
  const userId = req.params.id
  User.findById(userId)
    .then((data) => res.send(data.paymentList))
    .catch((err) => console.error(err));
};

function mergeNewPaymentItemToArray(input, newObj) { 
  let originalData = input.paymentList;
  let newData = [...originalData, newObj];
  input.paymentList = newData;
  let x = newData.reduce(function (acc, obj) {
    return Number(acc) + Number(obj.totalValue);
  }, 0);
  input.totalPayment = Number(x).toFixed(2);
  input.overallValue = (input.totalDebt - input.totalPayment).toFixed(2);
  return input;
}

function deletePaymentItemFromArray(input, objId) {
  let originalData = input.paymentList;
  let newData = originalData.filter((item) => item["_id"] != objId);
  input.paymentList = newData;
  let x = newData.reduce(function (acc, obj) {
    return Number(acc) + Number(obj.totalValue);
  }, 0);
  input.totalPayment = Number(x).toFixed(2);
  console.log(input);
  input.overallValue = (input.totalDebt - input.totalPayment).toFixed(2);
  return input;
}

exports.payment_post_new = (req, res) => {
  const { id, description } = req.body;
  const totalValue = req.body.paymentAmount;

  const newPayment = {
    description,
    totalValue: Number(totalValue).toFixed(2),
  };
  
  User.findById(id)
    .then((data) => {
      res.send(data);
      mergeNewPaymentItemToArray(data, newPayment);
 
      data
        .save()
        .then((da) => console.log("successful update", da))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log("Error occured, " + err));
    
};

exports.payment_delete_item = (req, res) => {
  console.log(req.query);
  const { userID, paymentEntryID } = req.query;
  // console.log(userID, paymentEntryID);

  User.findById(userID)
    .then((data) => {
      res.send(data);
      deletePaymentItemFromArray(data, paymentEntryID);

      data
        .save()
        .then((da) => console.log("successful update", da))
        .catch((err) => console.log(err));

    })
    .catch((err) => console.log("Error occured, " + err));
};
