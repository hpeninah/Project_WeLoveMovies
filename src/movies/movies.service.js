const knex = require("../db/connection");

function list(knex, isShowing){
    if(isShowing === false) {
        return knex('movies').select('*')
    } else {
        return knex('movies as m')
        .distinct('m.*')
        .join('movies_theaters as mt', 'mt.movie_id', 'm.movie_id')
        .where({'mt.is_showing': true});
    }
}

function listReviews(knex, movieId) {
    return knex('reviews as r')
    .where({'r.movie_id': movieId})
};

function read(knex, movieId) {
    return knex('movies as m')
    .where({'m.movie_id': movieId})
    .first();
}

function findTheater(knex, movieId) {
    return knex('theaters as t')
    .select()
    .join('movies_theaters as mt', 'mt.theater_id', 't.theater_id')
    .where({ 'mt.is_showing': true })
    .andWhere({ 'mt.movie_id': movieId})
}

function listCritics(knex, criticId) {
    return knex('critics as c')
    .where({'c.critic_id': criticId})
    .first();
}

module.exports = {
    list,
    listReviews,
    read,
    findTheater,
    listCritics,
};