/**
 * Created by bo on 9/27/16.
 */
'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');



exports.listAll = function (req, res) {

    User.find(function (err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}; // End of find all

exports.getOne = function (req, res) {

    var id = req.params.id;

    User.findById(id, function (err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}; // End of findById


exports.delete = function (req, res) {

    var id = req.params.id;

    User.remove({"_id": id}, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}; // End of delete


exports.save = function (req, res) {

    var newUser = new User(req.body);

    newUser.save(function (err, createdDocument) {
        if (err) {
            res.json(err);
        } else {
            res.json(createdDocument);
        }
    });
};  // End of post (save)


exports.update = function (req, res) {

    var id = req.body._id;
    var editPerson = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    User.findByIdAndUpdate(id, editPerson, {'new': true}, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}; // End of put (edit)