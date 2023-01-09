const Movie = require('../models/movie.model');

const movieCtrl = {};

movieCtrl.addMovie = async (req, res) => {
    const myMovie = new Movie(req.body);
    await myMovie.save().then(() => {
        res.json({message: 'Movie Successfully Inserted'})
    })
        .catch(err => res.send(err.message));
}
movieCtrl.getMovies = async (req, res) => {
    const movies = await Movie.find()
        .then((data) => res.json(data))
        .catch((err) => console.log(err));
}

movieCtrl.getMovie = () => {};
movieCtrl.deleteMovie = () => {};
movieCtrl.updateMovie = () => {};
movieCtrl.getGenres = () => {};

module.exports = movieCtrl;
