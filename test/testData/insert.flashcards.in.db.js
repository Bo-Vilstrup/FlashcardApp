"use strict";
var mongoose = require('mongoose');
var Cards = mongoose.model('Cards');
var User = mongoose.model('User');

var testUser = "test";
var password = "test";

var saveCard = function (fc) {

    Cards.find({"user": testUser}, function (err, userDB) {

        if (err) {
            console.log(err)
        } else {
            var db = userDB[0];
            db.flashcards.push(fc);
            db.save(function (err, createdDocument) {
                if (err) {
                    console.log(err);
                } else {
                    return createdDocument;
                }
            });
        }
    });
};


var deltedUserAndDeck = function (callback) {

    User.remove({userName: testUser}, function (err, doc) {

        if(!err) {
            console.log("user deleted");
            Cards.remove({user: testUser}, function (err, doc) {
                if(!err) {
                    console.log("Cards deleted");
                    callback();
                }
            });
        }
    });

};


var createUSerAndDeck = function (callback) {

    var newUser = new User({userName: testUser, password: password});
    var userName = testUser;

    newUser.save(function (err, createdDocument) {
        if(err) {
            console.log(err);
        } else {
            //create a place in the database for the user
            if(createdDocument != null) {
                var newUserDB = new Cards({"user": userName});

                newUserDB.save(function (err, db) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("user created");
                        callback();
                    }
                }); // End of save newUserDB
            }
        }
    }); // End of Save newUSer
};



module.exports.setupTestData = function () {

    deltedUserAndDeck(function () {
        createUSerAndDeck(function () {
            var flashcards = require('../testData/flashcards1')();
            flashcards.forEach(function (item, index) {
                saveCard(item);
            });

        });
    });
};



