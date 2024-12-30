const User = require("../models/userModel");

exports.debt_get_all = (req, res) => {
    const uid = req.params.id
    console.log(uid)

    User.findById(uid)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "couldn't find a User with id " + id
                });
            else res.send(data.debtList);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving User with id=" + id
                });
        });
}

function mergeNewDebtItemToArray(input, newObj) {
    console.log(input);
    let originalData = input.debtList;
    let newData = [...originalData, newObj];
    input.debtList = newData;
    let x = newData.reduce(function(acc, obj) {
        return acc + obj.totalValue;
    }, 0);
    input.totalDebt = x.toFixed(2);
    input.overallValue = input.totalDebt - input.totalPayment
    return input;
}

function deleteDebtItemFromArray(input, objId) {
    let originalData = input.debtList;
    console.log(originalData.length);
    let newData = originalData.filter((item) => item["_id"] != objId);
    console.log(newData.length);
    input.debtList = newData;
    let x = newData.reduce(function(acc, obj) {
        return acc + obj.totalValue;
    }, 0);
    input.totalDebt = x.toFixed(2);
    console.log(input);
    input.overallValue = input.totalDebt - input.totalPayment
    return input;
}

exports.debt_post_new = (req, res) => {
    const {
	id,
        description,
        amount,
        unitPrice
    } = req.body;

    let totalValue = (amount * unitPrice).toFixed(2);

    let newDebt = {
	description: description,
        amount: Number(amount),
        unitPrice: Number(unitPrice),
        totalValue: Number(totalValue),
    };

    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "couldn't found a User with id " + id
                });
	    console.log('assuming we find a us4er he is ')
            mergeNewDebtItemToArray(data, newDebt);
            //console.log(data, 'before saving to db')

            data
                .save()
                .then((da) => console.log("successful update"))
                .catch(err => {
                    res.status(500).send({
                        message: "Error Updating User : " + err
                    });
                })

        })
        .catch(err => {
            return res.status(500).send({
                message: "Error retrieving User with id="
            });
        });

};

exports.debt_delete_item = (req, res) => {
    console.log(req.query, 'delete debt');
    const {
        userID,
        debtID
    } = req.query;
    

    User.findById(userID)
        .then((data) => {
            res.send(data);

            deleteDebtItemFromArray(data, debtID);
            data
                .save()
                .then((da) => console.log("successful update", da))
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log("Error occured, " + err));
	
};
