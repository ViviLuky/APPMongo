

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

movieCtrl.getMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id)
        .then((data) => {
        if (data!=null) res.json(data)
            else  res.json({message: 'movie no esta '})
    })
        .catch(err => console.log(err))
};

movieCtrl.getMovieName = async (req, res) => {
    const movie = await Movie.find({title:req.params.name})

        .then((data) => {
            if (data!=null)
                res.json(data)
            else res.json({message: 'La peli no existe'})
        })
        .catch(err => console.log(err))
};

movieCtrl.updateMovie = async (req, res) => {
    const movie = req.body;
    await Movie.findByIdAndUpdate(
        req.params.id,
        {$set: movie} ,
        {new: true}
    ).then((data) => {
        if(data!=null) res.json(
            {message: ' Movie Succeful Updated', data})
        else res.json(
            {message: 'Movie doen´´ exist'})
    })
        .catch(err => console.log(err))
};

movieCtrl.deleteMovie = async (req, res) => {
    await  Movie.findByIdAndDelete(req.params.id)
        .then((data) => {
        if (data!=null) res.json(
            {message: 'Movie Succesossfully Deleted'})
        else res.json({message: 'Movie delete'})
    })
    .catch(err => console.log(err))
};


movieCtrl.getGenres = async (req, res) => {
    await Movie.find().distinct('genres')
        .then((data) => res.json(data))
        .catch((err) => console.log(err))
};

module.exports = movieCtrl;
