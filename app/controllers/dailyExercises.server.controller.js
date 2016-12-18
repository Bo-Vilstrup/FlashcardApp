/**
 * Created by bo on 10/6/16.
 */
'use strict';

var mongoose = require('mongoose');
//var Card = mongoose.model('Card');

var Card2 = mongoose.model('Card2');
var Cards = mongoose.model('Cards');

var cal = require('../sm2/spacedRepetition.server.calculator');


exports.getDeck = function (req, res) {

    Cards.find({"user": "test"/*req.userName*/}, function (err, userDB) {

        if(!err) {
            var flashcards = userDB[0].flashcards;

            sortByDate(flashcards);

            var now = Date.now();
            var deck = [];
            flashcards.forEach(function (card) {

                if(card.rating.nextRepetition <= now) {
                    deck.push(card);
                } else {
                    return;
                }
            });
            res.json({"flashcards": deck});
        } // End of if(err)
    });
}; // End of find all



exports.getFuture = function (req, res) {

    Cards.find({"user": "test"/*req.userName*/}, function (err, userDB) {

        if(!err) {
            var flashcards = userDB[0].flashcards;

            sortByDate(flashcards);

            var now = flashcards[0].rating.nextRepetition;
            var deck = [];
            flashcards.forEach(function (card) {

                if(card.rating.nextRepetition.getFullYear() <= now.getFullYear()) {
                    if(card.rating.nextRepetition.getDate() <= now.getDate()) {
                        if (card.rating.nextRepetition.getDay() <= now.getDay()) {
                            deck.push(card);
                        } else {
                            return;
                        }
                    } else {
                        return;
                    }
                } else {
                    return;
                }
            }); // End of forEach()
            res.json({"flashcards": deck});
        } // End of if(err)
    });
}; // End of find all





var sortByDate = function(flashcards) {

    return flashcards.sort(function(a, b) {
        return (new Date(a.rating.nextRepetition)) - (new Date(b.rating.nextRepetition));
    });

};



exports.saveEvaluation = function (req, res) {

    var id = req.body.id;
    var grade = req.body.grade;

    findCard(id, function (card) {
        cal.calcIntervalEF(card, grade);

        editCard(card, function (cards) {
            res.json(cards);
        });
        //res.json(editCard(card));
    });
}; // End of saveEvaluation (post)




var findCard = function (id, callback) {

    Cards.find({"user": "test"/*req.userName*/}, function (err, userDB) {

        if (!err) {
            var db = userDB[0];
            var card = db.flashcards.id(id);
            return callback(card);
        }
    });
};


var editCard = function (card, callback) {

    var id = card._id;
    var editCard = {
        "category": card.category,
        "question": card.question
    };

    Cards.find({"user": "test"/*req.userName*/}, function (err, userDB) {

        if (!err) {
            var db = userDB[0];
            var flashcard = db.flashcards.id(id);

            flashcard.category = card.category;
            flashcard.question = card.question;

            flashcard.rating.durationElapsed = card.rating.durationElapsed;
            flashcard.rating.correctAnswered = card.rating.correctAnswered;

            flashcard.rating.lastRepetition = card.rating.lastRepetition;
            flashcard.rating.nextRepetition = card.rating.nextRepetition;

            flashcard.rating.grade = card.rating.grade;
            flashcard.rating.interval = card.rating.interval;
            flashcard.rating.repetition = card.rating.repetition;
            flashcard.rating.ef = card.rating.ef;

            flashcard.answers.forEach(function (item, index) {
                item.answer = card.answers[index].answer;
                item.isCorrect = card.answers[index].isCorrect;
            });


            db.save(function (err, createdDocument) {
                if (!err) {
                    return callback(createdDocument);
                }
            });
        }
    });

};

