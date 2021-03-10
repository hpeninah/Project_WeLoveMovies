const knex = require("../db/connection");

function getReviewById(knex, reviewId){
  return knex("reviews as r")
  .select("*")
  .where({"r.review_id": Number(reviewId)})
  .first();
}

function update(knex, review){
  return knex("reviews as r")
  .update(review)
  .where({"r.review_id": review.review_id});
}

function destroy(knex, reviewId){
  return knex("reviews as r")
  .where({"r.review_id": reviewId})
  .delete();
}

module.exports = {
    getReviewById,
    update,
    destroy,
}