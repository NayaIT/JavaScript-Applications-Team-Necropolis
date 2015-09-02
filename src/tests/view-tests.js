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
		it('reset() shuold reset view.cells background color to rgb(204, 204, 204)', function(){
			
			var grid = [];
			 for (var i = 0; i < 18; i+=1) {
				 grid[i] = new Array(12);
            	for (var j = 1; j < 11; j+=1) {
					grid[i][j] = $('<a/>').css('backgroundColor', 'black');
            	}
        	}
			
			view.cells = grid;
			view.reset(grid);
			
			var counter = 0;
			for (var index = 0, len = view.cells.length; index < len; index++) {
				for (var j = 1; j < 11; j+=1) {
					if(grid[index][j].css('backgroundColor') === 'rgb(204, 204, 204)'){
						counter += 1;
					}
            	}	
			}

			expect(counter).to.be.eql(180);
		})
    })
});