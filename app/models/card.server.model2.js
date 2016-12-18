/**
 * Created by bo on 9/30/16.
 */
'use strict';

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var CardSchema = new mongoose.Schema({

    "category": "String",
    "question": "String",
    "rating": {
        "durationElapsed": { type: Number, default: -1 },
        "correctAnswered": { type: Boolean, default: false },
        "lastRepetition": { type: Date, default: '' },
        "nextRepetition": { type: Date, default: Date.now },
        "grade": { type: Number, default: -1 },
        "interval": { type: Number, default: 0 },
        "repetition": { type: Number, default: 0 },
        "ef": { type: SchemaTypes.Double, default: 2.5}
    },
    "answers": [
        {
            "answer": "String",
            "isCorrect": { type: Boolean, default: false }
        }
    ]
}, {collection: "card2"});

mongoose.model("Card2", CardSchema); // entity manager


var CardsSchema = new mongoose.Schema({

    "user" : { type: String },
    "flashcards": [CardSchema]

}, {collection: "cards"});

mongoose.model("Cards", CardsSchema); // entity manager
