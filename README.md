<p align="center"><a href="http://telerikacademy.com//"><img src="https://github.com/tddold/Telerik-Academy/blob/master/Programming%20with%20C%23/1.%20C%23%20Fundamentals%20I/Presentation/Telerik.png" /></a></p>

<h1 align="center">JavaScript Applications - "Team Necropolis"</h1>

<h2 align="center">Classic Tetris Game</h2>

##Game Description
"Classic Tetris Game" is a standard tetris game, geveloped in Javascript. In order to start new game, you have to press "New game" button, and then play with "JKLI" keys. Each completed row give points to the player. The speed is increased on certain amount of points, and the level increases as well. The more rows you complete, the more points you get.
Good luck!

##Project Architecture
- Developed in JavaScript
- Completely OOP Model-View-Controller design
- Game model is implemented in file gameModel.js
- UI implementaion is in file view.js
- Game control is implemented in file tetris.js
- Entry point of the program is function Tetris.init()
- All objects are loaded dinamically using System.js
- All game configuration is implemented in file config.js

##Project Design
- UI of the game is based on HTML tags and CSS styles
- JQuery is used for DOM manipulation
- Main game field is based on HTML table, and only CSS styles are changed dinamically
- All control and statistic fields are separate divs
- Game is scalable, used bootstrap

##Storage, game score and sharing results
- All score and storage logic is implemented in score.js
- When game is over, result is store as localStorage in the browser
- Results can be shared using Google Plus, Facebook and Tweeter JS APIs

##Tests
Tests are performed with Mocha Unit Testing Framework and Chai assertion framework. Unit tests run with Node.js " spec " reporter. To be run on your machine you need to have installed " iojs ". Just open console in folder tests and run command " npm test ".
- gameModel-tests.js
The first series of tests verify gameModel.js module contains all the functions you that he needed.
The second series of tests verify function " newShape() " from same module does the function returns the correct data. Numbers beteween 1 and 7.
- view-tests.js
The first series of tests verify view.js module contains all the functions you that he needed. The second series of tests verify functions " reset(), draw(), reDraw(), clearLine() " from same module.

##Team members
- __ageorgiev__ - Atanas Georgiev - Base game + Use jQuery, Implement OOP design
- __TodorDimitrov__ - Todor Dimitrov - Unit Tests
- __Nayata__ - Niya Keranova - localStorage
- __vasilevhr__ - Hristo Vasilev - Third Party APIs
- __Alexio86__ - Alexander Pavlov - Twitter Bootstrap
  	
##Project Link:
https://github.com/NayaIT/JavaScript-Applications-Team-Necropolis
