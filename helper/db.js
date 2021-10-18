const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://alkano:alkano@movie-api-2021.mcg1i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' /*, {useMongoClient : true}*/);
    mongoose.connection.on('open', () => {
        //console.log('Baglandi');
    })

    mongoose.connection.on('error', (err) => {
        console.log('Mongo error',err);
    })

    mongoose.Promise= global.Promise;
}
