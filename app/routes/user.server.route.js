/**
 * Created by bo on 9/25/16.
 */
'use strict';

var express = require('express');
var router = express.Router();

require('../models/user.server.model.js'); // this has to be moved to a config file or something
var user = require('../controllers/user.server.controller.js');

router.route('/users')
    .get(user.listAll);

router.route('/user/:id')
    .get(user.getOne)
    .delete(user.delete);

router.route('/user')
    .post(user.save)
    .put(user.update);

module.exports = router;
