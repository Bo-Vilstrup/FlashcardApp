/**
 * Created by bo on 10/6/16.
 */
var express = require('express');
var router = express.Router();

//require('../models/card.server.model'); // this has to be moved to a config file or something
require('../models/card.server.model2'); // this has to be moved to a config file or something
var dailyExercises = require('../controllers/dailyExercises.server.controller');



router.route('/dailyExercises')
    .get(dailyExercises.getDeck);


router.route('/getFutureCards')
    .get(dailyExercises.getFuture);

router.route('/postCards')
    .post(dailyExercises.saveEvaluation);

module.exports = router;