/*globals describe, it, require, before, beforeEach, global, $*/
var expect = require('chai').expect;
var jsdom = require('jsdom');
var jq = require('jquery');
import gameModel from '../scripts/gameModel.js';
import view  from '../scripts/view.js';
import config from '../scripts/config.js';

describe('View tests', function () {

    before(function (done) {
        jsdom.env({
            html: '',
            done: function (errors, window) {
                global.window = window;
                global.document = window.document;
                global.$ = jq(window);
                Object.keys(window)
                    .filter(function (prop) {
                        return prop.toLowerCase().indexOf('html') >= 0;
                    }).forEach(function (prop) {
                        global[prop] = window[prop];
                    });
                done();
            }
        });
    });

    beforeEach(function () {

    });

    describe('View should contains', function () {
        it('function "init"', function () {
            expect(view.init).to.be.a('function');
        });

        it('function "drawNext"', function () {
            expect(view.drawNext).to.be.a('function');
        });

        it('function "reset"', function () {
            expect(view.reset).to.be.a('function');
        });

        it('function "draw"', function () {
            expect(view.draw).to.be.a('function');
        });

        it('function "reDraw"', function () {
            expect(view.reDraw).to.be.a('function');
        });

        it('function "clearLine"', function () {
            expect(view.clearLine).to.be.a('function');
        });
    });

    describe('View function ', function () {

        it('reset() shuold reset view.cells background color to rgb(204, 204, 204)', function () {
            // Arrange
            var grid = [];
            for (var i = 0; i < 18; i += 1) {
                grid[i] = new Array(12);
                for (var j = 1; j < 11; j += 1) {
                    grid[i][j] = $('<a/>').css('backgroundColor', 'black');
                }
            }

            view.cells = grid;
            // Act
            view.reset(grid);

            var counter = 0;
            for (var index = 0, len = view.cells.length; index < len; index++) {
                for (var j = 1; j < 11; j += 1) {
                    if (view.cells[index][j].css('backgroundColor') === 'rgb(204, 204, 204)') {
                        counter += 1;
                    }
                }
            }

            // Assert
            expect(counter).to.be.eql(180);
        })

        it('draw() should draw correct current shape', function (done) {
            this.timeout(3000);
            // Arrange
            var i, j, currentShape = [
                [
                    [0, 0, 0, 0],
                    [1, 1, 1, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0]
                ],
                [],
                [],
                []
            ];

            var currentShapeNotEmptyCells = 0;
            currentShape[0]
                .forEach(function (arr) {
                    arr.forEach(function (num) {
                        if (num) {
                            currentShapeNotEmptyCells += 1;
                        }
                    })
                });

            var grid = [];
            for (i = -3; i < 18; i += 1) {
                grid[i] = [];
                for (j = 1; j < 11; j += 1) {
                    grid[i][j] = $('<a />');
                }
            }

            view.cells = grid;
            var shapePosition = 0;
            var color = 'rgb(234, 234, 234)';
            var xPos = 4;
            var yPos = -3;
            var counter = 0;

            // Act
            view.draw(currentShape, shapePosition, xPos, yPos, color);

            for (i = -3; i < 18; ++i) {
                for (j = 1; j < 11; ++j) {
                    if (view.cells[i][j].css('backgroundColor') === 'rgb(234, 234, 234)') {
                        counter += 1;
                    }
                }
            }
            
            // Assert
            expect(counter).to.be.eql(currentShapeNotEmptyCells);
            done();
        })

        it('reDraw () must keep the same color after it is called', function (done) {
            this.timeout(3000);
            
            // Arrange
            view.cells = [];
            for (var i = 0; i < 18; i += 1) {
                view.cells[i] = [];
                for (var j = 1; j < 11; j += 1) {
                    view.cells[i][j] = $('<a />').css('backgroundColor', 'rgb(234, 234, 234)');
                }
            }

            var grid = [];
            var cellsWithFirstColor = 0;
            var cellsWithSecondColor = 0;
            for (var i = 0; i < 18; i += 1) {
                grid[i] = [];
                for (var j = 1; j < 11; j += 1) {
                    if (j % 2) {
                        grid[i][j] = 1;
                        cellsWithFirstColor += 1;
                    } else {
                        grid[i][j] = 0;
                        cellsWithSecondColor += 1;
                    }
                }
            }
            
            // Act
            view.reDraw(grid);

            var cellsWithFirstColorAfterRedraw = 0;
            var cellsWithSecondColorAfterRedraw = 0;
            for (var i = 0; i < 18; i += 1) {
                for (var j = 1; j < 11; j += 1) {
                    if (view.cells[i][j].css('backgroundColor') === 'rgb(234, 234, 234)') {
                        cellsWithFirstColorAfterRedraw += 1;
                    }

                    if (view.cells[i][j].css('backgroundColor') === 'rgb(255, 102, 0)') {
                        cellsWithSecondColorAfterRedraw += 1;
                    }
                }
            }
 
            // Assert           
            expect(cellsWithFirstColor).to.be.eql(cellsWithFirstColorAfterRedraw);
            expect(cellsWithSecondColor).to.be.eql(cellsWithSecondColorAfterRedraw);
            done();
        })

        it('clearLine() should set background color on grid line to rgb(204, 204, 204)', function () {
            // Arrange
            view.cells = [];
            for (var i = 0; i < 18; i += 1) {
                view.cells[i] = [];
                for (var j = 1; j < 11; j += 1) {
                    view.cells[i][j] = $('<a />').css('backgroundColor', 'rgb(234, 234, 234)');
                }
            }
            
            // Act
            view.clearLine(0);

            var isClear = true;
            for (var j = 1, len = view.cells[0].length; j < len - 1; j += 1) {
                if (view.cells[0][j].css('backgroundColor') !== 'rgb(204, 204, 204)') {
                    isClear = false;
                }
            }
            
            // Assert              
            expect(isClear).to.be.ok;
        })
    })
});