import 'jquery';
import config from 'scripts/config.js';
import gameModel from 'scripts/gameModel.js';

var tetris = {

    // Initialize to start the game
    start: function (game) {
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

    gameOver: function () {
        if (tetris.timer) {
            window.clearInterval(tetris.timer);
            tetris.timer = null;
        }
    }
};

export function init() {
    $('#grid table, #next table').css('backgroundColor', config.colors[0]);

    $('#start').click(function () {
        $('#start').attr('disabled', 'disabled');
        $('#stop').removeAttr('disabled');
        gameModel.init();
        tetris.start(gameModel);
    });
    $('#stop').click(function () {
        $('#stop').attr('disabled', 'disabled');
        $('#start').removeAttr('disabled');
        tetris.gameOver();
    });
}
