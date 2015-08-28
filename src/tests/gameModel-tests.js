/*globals describe, it, require, before, beforeEach, global, $*/
var expect = require('chai').expect;
var jsdom = require('jsdom');
var jq = require('jquery');
import gameModel from '../scripts/gameModel.js';
import view  from '../scripts/view.js';

describe('game model tests', function () {

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
    document.body.innerHTML = '<div id="root"><h1>Tests</h1></div>';
  });

  describe('game model should have', function () {
        it('Init function',function(){
            expect(gameModel.init).to.be.a('function');
        })
  });

});