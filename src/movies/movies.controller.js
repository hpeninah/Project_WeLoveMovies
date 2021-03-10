const MoviesService = require("./movies.service");

async function validateMovie(req, res, next) {
    const knex = req.app.get('db');
    const movieId = req.params.movieId;
    const foundMovie = await MoviesService.read(knex, movieId);

    if(!foundMovie) {
        return next({
            status: 404,
            message: `${movieId} not found`
        })
    }
    res.locals.movie = foundMovie;
    next();
}

async function list(req, res, next) {
    const knex = req.app.get('db');
    const isShowing = req.query.is_showing;

    const movies = !isShowing ? await MoviesService.list(knex) : await MoviesService.list(knex, isShowing);

    for(const movie of movies) {
        movie.reviews = await MoviesService.listReviews(knex, movie.movie_id);
    }
    res.json({ data: movies });
};

async function read (req, res, next) {
    res.json({ data: res.locals.movie });
}

async function findTheaters(req, res, next) {
    const knex = req.app.get('db');
    const movieId = req.params.movieId;
    res.json({ data: await MoviesService.findTheater(knex, movieId)});
}

async function listReviews(req, res, next) {
    const knex = req.app.get('db');
    const movieId = req.params.movieId;
    const reviews = await MoviesService.listReviews(knex, movieId);
    for(const review of reviews) {
        review.critic = await MoviesService.listCritics(knex, review.critic_id);
    }
    res.json({ data: reviews });
}


module.exports = {
    list,
    read: [validateMovie, read],
    findTheater: [validateMovie, findTheaters],
    listReviews: [validateMovie, listReviews],
};