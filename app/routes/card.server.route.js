/**
 * Created by bo on 9/30/16.
 */
var express = require('express');
var router = express.Router();

//require('../../app/models/card.server.model'); // this has to be moved to a config file or something
require('../../app/models/card.server.model2'); // this has to be moved to a config file or something
var card = require('../../app/controllers/card.server.controller');



router.route('/cards')
    .get(card.listAll);

router.route('/card/:id')
    .get(card.getOne)
    .delete(card.delete);

router.route('/card')
    .put(card.update)
    .post(card.save);

module.exports = router;
