
var cardFile = 'baseCards.json',
    quizList = [],
    quizTimer = 4000,
    today = new Date(),
    cards = [],
    cardCounter = 0,
    count = 0;
today.setHours(0, 0, 0, 0);

// SM-2:
// EF (easiness factor) is a rating for how difficult the card is.
// Grade: (0-2) Set reps and interval to 0, keep current EF (repeat card today)
//        (3)   Set interval to 0, lower the EF, reps + 1 (repeat card today)
//        (4-5) Reps + 1, interval is calculated using EF, increasing in time. 
function calcIntervalEF(card, grade) {
    var oldEF = card.rating.ef,
        newEF = 0,
        nextDate = new Date(today);

    card.rating.grade = grade;

    if (grade < 3) {
        card.rating.repetition = 0;
        card.rating.interval = 0;
    } else {

        newEF = oldEF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
        if (newEF < 1.3) { // 1.3 is the minimum EF
            card.rating.ef = 1.3;
        } else {
            card.rating.ef = newEF;
        }

        card.rating.repetition = card.rating.repetition + 1;

        switch (card.rating.repetition) {
            case 1:
                card.rating.interval = 1;
                break;
            case 2:
                card.rating.interval = 6;
                break;
            default:
                card.rating.interval = Math.round((card.rating.repetition - 1) * card.rating.ef);
                break;
        }
    }

    if (grade === 3) {
        card.rating.interval = 0;
    }

    nextDate.setDate(today.getDate() + card.rating.interval);
    card.rating.nextRepetition = nextDate;
}

module.exports.calcIntervalEF = calcIntervalEF;
