const express = require('express');
const router = express.Router();

//Models
const Book = require('../models/Book');

router.post('/new',function (req,res,next){
    const book = new Book({
        title: 'Farklı bir kita',
        published: true,
        comments: [
            {message: "Harika değil."},
            {message: "Ben çok beğenmedim"}
        ],
        meta: {
            votes: 12,
            favs: 104
        }
    });

    book.save((err, data) => {
        if(err)
            console.log(err);

        res.json(data);
    })
})

router.get('/search', (req, res) => {
    Book.find({published: true}, (err,data) => {
        res.json(data);
    });
});

router.get('/searchOne', (req, res) => {
    Book.findOne({title: 'Alkano nodejs'}, (err,data) => {
        res.json(data);
    });
});

router.get('/searchById', (req, res) => {
    Book.findById('61368d98a7f8ece1a6a3e10d', (err,data) => {
        res.json(data);
    });
});

router.put('/update', (req, res) => {
    Book.update(
        { published: false},
        { published: true},
        { upsert: true
            /*upsert: kayıt yoksa
             yeni bir tane kayıt
              atıyor*/
        }, (err,data) => {
        res.json(data);
    });
});


router.put('/updateById', (req, res) => {
    Book.findByIdAndUpdate(
        '61368c77d2848f971a169842',
        {
            title: 'hello world',
            'meta.favs': 99
        },
        (err,data) => {
        res.json(data);
    });
});

router.delete('/remove', (req, res) => {
    Book.findOneAndRemove({published: true}, (err, book) => {
            res.json(book);
    });
});

module.exports = router;