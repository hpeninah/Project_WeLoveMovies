const service = require("./reviews.service.js");
const movieService = require("../movies/movies.service");

async function reviewExists(req, res, next) {
    const reviewId = req.params.reviewId;
    const knex = req.app.get("db");
    const foundReview = await service.getReviewById(knex, reviewId);

    if(!foundReview){
        next({
            status: 404,
            message: `${reviewId} cannot be found`
        });
    }
    res.locals.review = foundReview;
    next();
}

async function update(req, res, next) {
    const knex = req.app.get("db");
    const review = res.locals.review;
    
    const fields = ["content", "score"];
    for(const field of fields) {
        if(req.body.data[field]) review[field] = req.body.data[field];
    }

    await service.update(knex, review);

    review.critic = await movieService.listCritics(knex, review.critic_id);
    res.json({data: review});
}

async function destroy(req, res, next) {
  const knexInstance = req.app.get("db");
  const { review } = res.locals;
  await service.destroy(knexInstance, review.review_id);
  res.sendStatus(204);
}

module.exports = {
  update: [reviewExists, update],
  destroy: [reviewExists, destroy],
};
