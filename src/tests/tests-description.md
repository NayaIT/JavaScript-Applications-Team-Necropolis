# Tests of the project are located in the folder 'tests'

> It consists of two files

- gameModel-tests.js
- view-tests.js

> Tests are performed with Mocha Unit Testing Framework and Chai assertion framework.
> Unit tests run with Node.js " spec " reporter. To be run on your machine you need to have installed "  iojs ". Just open console in folder tests and run command " npm test ".

### gameModel-tests.js

> - The first series of tests verify gameModel.js module contains all the functions you that he needed.
> - The second series of tests verify function " newShape() " from same module does the function returns the correct data. Numbers beteween 1 and 7.

### view-tests.js
The first series of tests verify view.js module contains all the functions you that he needed.
The second series of tests verify functions " reset(), draw(), reDraw(), clearLine() " from same module. 
> - View function reset() shuold reset view.cells background color to rgb(204, 204, 204).
> - View function draw() should draw correct current shape in tetris grid.
> - View function reDraw() must keep the same tetris colors after it is called.
> - View function clearLine() should set background color on tetris grid line to rgb(204, 204, 204).