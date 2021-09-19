var express = require('express');
var router = express.Router();

//Models
const Movie = require('../models/Movie');

router.get('/', (req, res) => { // tüm filmleri listeleme
  const promise = Movie.find({ });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//Top 10
router.get('/:top10', (req, res, next) => { // top10 film
  const promise = Movie.find({}).limit(10).sort({imdb_score: -1});

  promise.then((movie) => {
    if(!movie)
      next({message: 'The movie was not found.', code: 404});

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/:movie_id', (req, res, next) => { // Id ile film arama
  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie) => {
    if(!movie)
      next({message: 'The movie was not found.', code: 404});

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});



router.delete('/:movie_id', (req, res, next) => { // Id ile film silme
  const promise = Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((movie) => {
    if(!movie)
      next({message: 'The movie was not found.', code: 404});

    res.json({status: 1});
  }).catch((err) => {
    res.json(err);
  });
});

router.post('/', function(req, res, next) { // film kaydetme
  //const {title, imdb_score, category, country, year} = req.body;

  const movie = new Movie(req.body);
  const promise = movie.save();

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

});

router.put('/:movie_id', (req, res, next) => { // Id ile film arama
  const promise = Movie.findByIdAndUpdate(
      req.params.movie_id,
      req.body,
      {
        new: true
      }
  );

  promise.then((movie) => {
    if(!movie)
      next({message: 'The movie was not found.', code: 403});

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
})

//Between

router.get('/between/:start_year/:end_year', (req, res) => { // tarih aralıklı filmleri listeleme
  const { start_year, end_year } = req.params;
  const promise = Movie.find(
      {
        year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
      }
    );
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
module.exports = router;
