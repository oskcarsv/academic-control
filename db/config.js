const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log('Successfull connection to DB');
    } catch (e) {
        throw new Error('Error trying to connect to DB ', e);
    }
};


module.exports = {
    dbConnection
};