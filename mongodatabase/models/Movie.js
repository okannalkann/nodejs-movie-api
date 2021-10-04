const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH} field is required.`'],
        maxlength: [15, '`{VALUE} field must be smaller than {MAXLENGTH}`'],
        minlength: [4, '`{VALUE} field must be bigger than {MINLENGTH}`'],
    },
    category: {
        type: String,
        max: 30,
        min: 3
    },
    country:{
        type: String,
        max: 60,
        min: 0
    },
    year: {
        type: Number,
        max: 2022,
        min: 1940
    },
    imdb_score: {
        type: Number,
        max: 10,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('movie', MovieSchema);