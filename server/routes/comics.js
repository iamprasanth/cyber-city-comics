const express = require('express');
const comicsRouter = express.Router();
const ComicsController = require('../controllers/comics');

// Get latest Comic
comicsRouter.route('/').get(ComicsController.getLatest)

// Get comic by id
comicsRouter.route('/:comicId').get(ComicsController.getById)

module.exports = comicsRouter;
