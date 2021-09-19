const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    published: {
        type: Boolean,
        default: false
        },
    comments: [{ message: String }],
    meta: {
        votes: Number,
        favs: Number
    },
    publishedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('book', BookSchema);