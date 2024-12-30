const mongoose = require('mongoose')
const User = require('./models/userModel')

const url = 'mongodb+srv://darklord20105:Itif3b9MNlxxQPdh@cluster0.qknv0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// 'mongodb+srv://darklord20105:<db_password>@cluster0.qknv0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectionParams = {
    serverSelectionTimeoutMS: 10000,
}

mongoose.set('strictQuery', true);

mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to mongodb database successfully…!')
    })
    .catch((err) => {
        console.error('error connecting to db '+err.message);

        if(err.name==='MongoNetworkError') {
            console.error('network error')
        } else if (err.name === 'MongooseServerSelectionError') {
            console.error(" server selrection error")
        } else {
            console.error(err)
        }
    })

//examples
/*
const user1 = new User({
    name: 'mhmd',
    jobTitle: 'mechanic',
    debtList: [{
        description: 'regular diesel',
        amount: 45,
        unitPrice: 0.5,
    }, {
        description: 'regular gasoline',
        amount: 13,
        unitPrice: 0.65,
    }, {
        description: 'super diesel',
        amount: 12,
        unitPrice: 1.1,
    }],
    paymentList: [{
        description: 'cash',
        totalValue: 10,
    }]
});
const user2 = new User({
    name: 'Ali',
    jobTitle: 'mechanic',
    debtList: [{
        description: 'super diesel',
        amount: 25,
        unitPrice: 1.1,
    }],
    paymentList: [{
        description: 'cash',
        totalValue: 20,
    }]
});

const user3 = new User({
    name: 'kaseem',
    jobTitle: 'mechanic',
    debtList: [],
    paymentList: []
})




user1.save().then(
    () => console.log("One entry added"),
    (err) => console.log(err)
);

user2.save()
    .then(
        () => console.log("second entry added"),
        (err) => console.log(err)
    );

user3.save()
    .then(
        () => console.log("third entry added"), (err) => console.log(err));



*/