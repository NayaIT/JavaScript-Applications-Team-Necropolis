import config from 'scripts/config.js';
import view from 'scripts/view.js';

var gameObject = {

    // Pre-load elements of the grid
    init: function () {
        view.init();
    },

    // Initialize to start the game
    start: function (gameOverCallback) {
        // Stats
        gameObject.level = 0;
        gameObject.lines = 0;
        gameObject.score = 0;
        gameObject.gameOverCallback = gameOverCallback;

        // Array which contains data of the grid
        gameObject.grid = [
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

        gameObject.next = gameObject.newShape();
        gameObject.shift();
        gameObject.refresh();
    },

    // Generate an random shape
    newShape: function () {
        var r = 1 + Math.random() * 7;
        return parseInt(r > 7 ? 7 : r, 10);
    },

    // Define then draw the next shape
    setNext: function () {
        gameObject.next = gameObject.newShape();
        view.drawNext(gameObject.next);
    },

    // The next shape becomes the current one; reset coordinates
    shift: function () {
        gameObject.cur = gameObject.next;
        gameObject.x = gameObject.x0 = 4;
        gameObject.y = config.startPosition[gameObject.cur];
        gameObject.y0 = gameObject.y - 2;
        gameObject.r = gameObject.r0 = 0;
        gameObject.curShape = config.shapes[gameObject.cur];
        if (gameObject.canGo(0, gameObject.x, gameObject.y)) {
            gameObject.setNext();
            return true;
        }
        return false;
    },

    // Check overlays
    canGo: function (r, x, y) {
        var i, j;
        for (i = 0; i < 4; ++i) {
            for (j = 0; j < 4; ++j) {
                if (gameObject.curShape[r][j][i] && gameObject.grid[y + j] && gameObject.grid[y + j][x + i]) {
                    return false;
                }
            }
        }
        return true;
    },

    // Move the current shape to the left
    moveLeft: function () {
        if (gameObject.canGo(gameObject.r, gameObject.x - 1, gameObject.y)) {
            --gameObject.x;
            gameObject.refresh();
        }
    },

    // Move the current shape to the right
    moveRight: function () {
        if (gameObject.canGo(gameObject.r, gameObject.x + 1, gameObject.y)) {
            ++gameObject.x;
            gameObject.refresh();
        }
    },

    // Rotate the current shape
    rotate: function () {
        var r = gameObject.r == gameObject.curShape.length - 1 ? 0 : gameObject.r + 1;
        if (gameObject.canGo(r, gameObject.x, gameObject.y)) {
            gameObject.r0 = gameObject.r;
            gameObject.r = r;
            gameObject.refresh();
        }
    },

    // Move down the current shape
    moveDown: function () {
        if (gameObject.canGo(gameObject.r, gameObject.x, gameObject.y + 1)) {
            ++gameObject.y;
            gameObject.refresh();
        } else {
            gameObject.touchDown();
        }
    },

    // The current shape touches down
    touchDown: function () {
        var i, j, k, r, f;
        // mark the grid
        for (i = 0; i < 4; ++i) {
            for (j = 0; j < 4; ++j) {
                if (gameObject.curShape[gameObject.r][j][i] &&
                    gameObject.grid[gameObject.y + j]) {
                    gameObject.grid[gameObject.y + j][gameObject.x + i] = gameObject.cur;
                }
            }
        }
        // search complete lines
        f = 0;
        for (i = 17, k = 17; i > -1 && f < 4; --i, --k) {
            if (gameObject.grid[i].join('').indexOf('0') == -1) {
                // Complete lines become white
                view.clearLine(k);
                ++f;
                for (j = i; j > 0; --j) {
                    gameObject.grid[j] = gameObject.grid[j - 1].concat();
                }
                ++i;
            }
        }

        if (f) {
            gameObject.after(f);
        }
        // try to continue
        if (gameObject.shift()) {
            gameObject.refresh();
        } else {
            gameObject.gameOver();
        }
    },

    gameOver: function () {
        view.reset(gameObject.grid);
        view.draw(gameObject.curShape, gameObject.r0, gameObject.x0, gameObject.y0, '#cccccc');
        gameObject.gameOverCallback();
    },

    // Finish the touchdown process
    after: function (f) {
        var i, j, l = (gameObject.level < 20 ? gameObject.level : 20) * 25;
        // stats
        gameObject.lines += f;
        if (gameObject.lines % 10 === 0) {
            gameObject.level = gameObject.lines / 10;
        }
        gameObject.score += (gameObject.level + 1) * config.points[f];
        view.reDraw(gameObject.grid);
        gameObject.refresh();
    },

    // Refresh the grid
    refresh: function () {
        // remove from the old position
        view.draw(gameObject.curShape, gameObject.r0, gameObject.x0, gameObject.y0, config.colors[0]);
        // draw to the next one
        view.draw(gameObject.curShape, gameObject.r, gameObject.x, gameObject.y, config.colors[gameObject.cur]);
        // change stats
        $('#level').html(gameObject.level + 1);
        $('#lines').html(gameObject.lines);
        $('#score').html(gameObject.score);
        // reset coordinates
        gameObject.x0 = gameObject.x;
        gameObject.y0 = gameObject.y;
        gameObject.r0 = gameObject.r;
    }
};

export default gameObject;
