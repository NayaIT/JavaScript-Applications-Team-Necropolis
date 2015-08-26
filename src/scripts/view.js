import config from 'scripts/config.js';

var view = {
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
    reset: function(grid, cells) {
        var i, j;
        for (i = 0; i < 18; ++i) {
            for (j = 1; j < 11; ++j) {
                if (grid[i][j]) {
                    cells[i][j].css('backgroundColor', '#cccccc');
                }
            }
        }
    }
};

export default view;
