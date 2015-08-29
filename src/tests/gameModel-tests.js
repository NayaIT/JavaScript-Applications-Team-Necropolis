/*globals describe, it, require, before, beforeEach, global, $*/
var expect = require('chai').expect;
var jsdom = require('jsdom');
var jq = require('jquery');
import gameModel from '../scripts/gameModel.js';
import view  from '../scripts/view.js';

describe('Game model tests', function () {

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

    describe('Game model should contains', function () {
        it('function "init"', function () {
            expect(gameModel.init).to.be.a('function');
        });

        it('function "start"', function () {
            expect(gameModel.start).to.be.a('function');
        });

        it('function "newShape"', function () {
            expect(gameModel.newShape).to.be.a('function');
        });

        it('function "setNext"', function () {
            expect(gameModel.setNext).to.be.a('function');
        });

        it('function "shift"', function () {
            expect(gameModel.shift).to.be.a('function');
        });

        it('function "canGo"', function () {
            expect(gameModel.canGo).to.be.a('function');
        });

        it('function "moveLeft"', function () {
            expect(gameModel.moveLeft).to.be.a('function');
        });

        it('function "moveRight"', function () {
            expect(gameModel.moveRight).to.be.a('function');
        });

        it('function "rotate"', function () {
            expect(gameModel.rotate).to.be.a('function');
        });

        it('function "moveDown"', function () {
            expect(gameModel.moveDown).to.be.a('function');
        });

        it('function "touchDown"', function () {
            expect(gameModel.touchDown).to.be.a('function');
        });

        it('function "gameOver"', function () {
            expect(gameModel.gameOver).to.be.a('function');
        });

        it('function "after"', function () {
            expect(gameModel.after).to.be.a('function');
        });

        it('function "refresh"', function () {
            expect(gameModel.refresh).to.be.a('function');
        });
    });

    describe('Game model function newShape ', function () {
        it('should return number', function () {
            var shapeNumber = gameModel.newShape();
            expect(shapeNumber).to.be.a('number');
        });
        
        it('should return integer number', function () {
            var shapeNumber = gameModel.newShape();
            expect(Number(shapeNumber) === shapeNumber && shapeNumber % 1 === 0).to.be.true;
        });

        it('should return number <= 7', function () {
            var shapeNumber = gameModel.newShape();
            expect(shapeNumber <= 7).to.be.true;
        })
    })
});