import 'jquery';
import config from 'scripts/config.js';
import gameModel from 'scripts/gameModel.js';

var tetris = {

    // Initialize to start the game
    start: function (game) {
        $('#grid td').css('backgroundColor', config.colors[0]);
        //    $('#start').unbind(tetris.start).val('pause').click(tetris.pause); /////////////////////
        //        $('#stop').set('disabled', false);
        tetris.bound = $.browser == 'msie' ? '#tetris' : window;
        $(tetris.bound).keypress(tetris.key);
        tetris.game = game;
        game.start(tetris.gameOver);
        tetris.duration = 600;
        tetris.timer = window.setInterval(game.moveDown, tetris.duration);
    },

    // Define the action to be fired depending on key entry
    key: function (e) {
        switch (e.charCode || e.keyCode) {
        case 74:
        case 106:
            tetris.game.moveLeft();
            break; // J
        case 76:
        case 108:
            tetris.game.moveRight();
            break; // L
        case 75:
        case 107:
            tetris.game.moveDown();
            break; // K
        case 73:
        case 105:
            tetris.game.rotate();
            break; // I
        }
        return false;
    },

    // // Pause the game
    // pause: function () {
    //     $(gameObject.bound).unkeypress(gameObject.key);
    //     window.clearInterval(gameObject.timer);
    //     gameObject.timer = null;
    //     $('#start').unclick(gameObject.pause).val('resume').click(gameObject.resume);
    // },
    //
    // // Resume the game
    // resume: function () {
    //     $(gameObject.bound).keypress(gameObject.key);
    //     gameObject.timer = window.setInterval(gameObject.moveDown, gameObject.duration);
    //     $('#start').unclick(gameObject.resume).val('pause').click(gameObject.pause);
    // },
    // Stop the game

    gameOver: function () {
        // Manage buttons
        console.log('aaa');
        // if (gameObject.timer) {
        //     $(gameObject.bound).unkeypress(gameObject.key);
        //     window.clearInterval(gameObject.timer);
        //     gameObject.timer = null;
        //     $('#start').unclick(gameObject.pause).val('start').click(gameObject.start);
        // } else {
        //     $('#start').unclick(gameObject.resume).val('start').click(gameObject.start);
        // }
    }
};

// Everything starts here
//$(window).load(function () {
//     tetris.init();
//     $('#grid table, #next table').css('backgroundColor', config.colors[0]);
//     $('#start').click(tetris.start);
//     $('#stop').click(tetris.gameOver);
// });

export function init() {
    $('#grid table, #next table').css('backgroundColor', config.colors[0]);

    gameModel.init();
    tetris.start(gameModel);
    console.log(gameModel);
    //$('#start').click(tetris.start);
    //$('#stop').click(tetris.gameOver);
}
