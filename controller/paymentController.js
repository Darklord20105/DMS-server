const User = require("../models/userModel");

exports.payment_get_all = (req, res) => {
  console.log(req.body);
  const userId = req.params.id
  User.findById(userId)
    .then((data) => res.send(data.paymentList))
    .catch((err) => console.error(err));
};

exports.payment_post_new = (req, res) => {
  console.log(req.body)
  const { id, description } = req.body;
  const totalValue = (req.body.totalValue).toFixed(2);

  const newPayment = {
    description,
    totalValue: Number(totalValue),
  };
  /*
  User.findOne({
    name: name,
  })
    .then((data) => {
      res.send(data);

      function mergeNewPaymentItemToArray(input, newObj) {
        console.log(input);
        let originalData = input.paymentList;
        let newData = [...originalData, newObj];
        input.paymentList = newData;
        let x = newData.reduce(function (acc, obj) {
          return acc + obj.totalValue;
        }, 0);
        input.totalPayment = x.toFixed(2);
        input.overallValue = input.totalDebt - input.totalPayment;
        return input;
      }
      mergeNewPaymentItemToArray(data, newPayment);

      data
        .save()
        .then((da) => console.log("successful update", da))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log("Error occured, " + err));
    */
};

exports.payment_delete_item = (req, res) => {
  console.log(req.body);
  const { name, docID } = req.body;
  console.log(name, docID);

  User.findOne({
    name: name,
  })
    .then((data) => {
      res.send(data);
      function deletePaymentItemFromArray(input, objId) {
        let originalData = input.paymentList;
        let newData = originalData.filter((item) => item["_id"] != objId);
        input.paymentList = newData;
        let x = newData.reduce(function (acc, obj) {
          return acc + obj.totalValue;
        }, 0);
        input.totalPayment = x.toFixed(2);
        console.log(input);
        input.overallValue = input.totalDebt - input.totalPayment
        return input;
      }
      deletePaymentItemFromArray(data, docID);
      data
        .save()
        .then((da) => console.log("successful update", da))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log("Error occured, " + err));
};
