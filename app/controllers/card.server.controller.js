/**
 * Created by bo on 9/30/16.
 */
'use strict';

var mongoose = require('mongoose');
var Card = mongoose.model('Card2');
var Cards = mongoose.model('Cards');


exports.listAll = function (req, res) {
    
    //Cards.find({"user": req.session.userName}, function (err, userDB) {
    Cards.find({"user": req.userName}, function (err, userDB) {
    
        if (err) {
            res.json(err);
        } else {
            var db = userDB[0];
            res.json(db.flashcards);
        }
    });
}; // End of find all


exports.getOne = function (req, res) {

    // Cards.find({"user": req.session.userName}, function (err, userDB) {
    Cards.find({"user": req.userName}, function (err, userDB) {

        if (err) {
            res.json(err);
        } else {
            var id = req.params.id;
            var db = userDB[0];
            res.json(db.flashcards.id(id));
        }
    });
}; // End of findById


exports.delete = function (req, res) {

    // Cards.find({"user": req.session.userName}, function (err, userDB) {
    Cards.find({"user": req.userName}, function (err, userDB) {

        if (err) {
            res.json(err);
        } else {
            var id = req.params.id;
            var db = userDB[0];
            db.flashcards.id(id).remove();
            db.save(function (err, doc) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(doc);
                }

            });
        }
    });
}; // End of delete

exports.save = function (req, res) {

    // Cards.find({"user": req.session.userName}, function (err, userDB) {
    Cards.find({"user": req.userName}, function (err, userDB) {

        if (err) {
            res.json(err);
        } else {
            var db = userDB[0];
            db.flashcards.push(req.body);
            db.save(function (err, createdDocument) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(createdDocument);
                }
            });
        }
    });
};  // End of post (save)

exports.update = function (req, res) {

    var id = req.body._id;
    var editCard = {
        "category": req.body.category,
        "question": req.body.question
    };

    // Cards.find({"user": req.session.userName}, function (err, userDB) {
    Cards.find({"user": req.userName}, function (err, userDB) {

        if (err) {
            res.json(err);
        } else {
            var db = userDB[0];
            var flashcard = db.flashcards.id(id);

            flashcard.category = req.body.category;
            flashcard.question = req.body.question;

            flashcard.rating.durationElapsed = req.body.rating.durationElapsed;
            flashcard.rating.correctAnswered = req.body.rating.correctAnswered;

            flashcard.rating.lastRepetition = req.body.rating.lastRepetition;
            flashcard.rating.nextRepetition = req.body.rating.nextRepetition;

            flashcard.rating.grade = req.body.rating.grade;
            flashcard.rating.interval = req.body.rating.interval;
            flashcard.rating.repetition = req.body.rating.repetition;
            flashcard.rating.ef = req.body.rating.ef;

            flashcard.answers.forEach(function (item, index) {
                item.answer = req.body.answers[index].answer;
                item.isCorrect = req.body.answers[index].isCorrect;
            });


            db.save(function (err, createdDocument) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(createdDocument);
                }
            });
        }
    });
}; // End of put (edit)
