/**
 * Created by bo on 12/14/16.
 */
/**
 * Created by bo on 9/25/16.
 */
'use strict';

var express = require('express');
var router = express.Router();

require('../models/user.server.model.js'); // this has to be moved to a config file or something
var user = require('../controllers/authenticate.server.controller');

// public
router.route('/signup')
    .post(user.signup);

router.route('/signin')
    .post(user.signin);

router.route('/signout')
    .post(user.signout);

module.exports = router;
