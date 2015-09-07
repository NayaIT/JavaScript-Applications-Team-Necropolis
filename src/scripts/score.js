//Player's name and score saved in local storage

//var scoreObject = (function(){
//    'use strict';
//
//    var score = 0;
//
//    function initScore() {
//        score = 0;
//    }
//
//    function updateScore(points) {
//        score = points;
//    }
//
//    function writeScore() {
//
////prompt the user for name
//        var username = prompt('Please enter your name:');
//
//        var scores = JSON.parse(localStorage['scores']) || [];
//        scores.push({username: username, score: score});
//        localStorage['scores'] = JSON.stringify(scores);
//    }
//
//    function readScore() {
//        var scores = JSON.parse(localStorage['scores']) || [];
//        return scores;
//    }
//
//    return {
//        initScore: initScore,
//        updateScore: updateScore,
//        writeScore: writeScore,
//        readScore: readScore
//    }
//}());