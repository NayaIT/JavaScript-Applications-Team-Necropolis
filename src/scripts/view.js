import config from 'scripts/config.js';

var view = {

    // initialize view, bound cells with html table
    init: function () {
        var i, j, k;

        $('#grid td').css('backgroundColor', config.colors[0]);
        view.cells = [];
        for (i = -3; i < 18; ++i) {
            view.cells[i] = [];
            for (j = 1; j < 11; ++j) {
                k = String.fromCharCode(i + 97);
                if (i >= 0) {
                    view.cells[i][j] = $(['#', k, j].join(''));
                } else {
                    view.cells[i][j] = $('<a />');
                }

            }
        }
    },

    // Draw next shape
    drawNext: function (next) {
        var i, j, s, c, d, n = config.colors[0];
        s = config.shapes[next][0];
        c = config.colors[next];
        for (i = 0; i < 4; ++i) {
            for (j = 0; j < 4; ++j) {
                d = s[i][j] ? c : n;
                $(['#x', j, i].join('')).css('backgroundColor', d);
            }
        }
    },

    reset: function(grid) {
        var i, j;
        for (i = 0; i < 18; ++i) {
            for (j = 1; j < 11; ++j) {
                if (grid[i][j]) {
                    view.cells[i][j].css('backgroundColor', '#cccccc');
                }
            }
        }
    },

    // Draw the current shape
    draw: function (curShape, r, x, y, c) {
        var i, j;
        for (i = 0; i < 4; ++i) {
            for (j = 0; j < 4; ++j) {
                if (curShape[r][j][i]) {
                    view.cells[y + j][x + i].css('backgroundColor', c);
                }
            }
        }
    },

    // redraw the grid
    reDraw: function (grid) {
        var i, j;
        for (i = 0; i < 18; ++i) {
            for (j = 1; j < 11; ++j) {
                view.cells[i][j].css('backgroundColor', config.colors[grid[i][j]]);
            }
        }
    },

    clearLine: function(line) {
        var j;
        for (j = 1; j < 11; ++j) {
            view.cells[line][j].css('backgroundColor', '#cccccc');
        }
    }

};

export default view;
