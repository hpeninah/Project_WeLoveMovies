if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const knex = require("./db/connection");

const moviesRouter = require('./movies/movies.router');
const reviewsRouter = require('./reviews/reviews.router');
const theatersRouter = require('./theaters/theaters.router');

app.use(express.json());
app.use(cors());
app.set('db', knex)
app.use('/movies', moviesRouter);
app.use('/reviews', reviewsRouter);
app.use('/theaters', theatersRouter);

//not found handler
app.use((req, res, next) => {
    next({
        status: 404,
        message:`Not found: ${req.originalUrl}`
    });
});

//error handler
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong!'} = err;
    res.status(status).json({ error: message });
});


module.exports = app;
