# JavaScript Mocking Fundamentals

When running tests, you don't want to make network requests. That could be expensive and slow. Instead of running your code exactly as it would run in production, we can modify how some JS modules and functions work during tests to avoid unreliability and improve the speed. This kind of modification can be stubs, mocks or test doubles.

> Mocking allows our test to be deterministic and ensure that we wil get the expected result ever time.

## Monkey patching

The most naïve approach to mocking in JavaScript is to override an object's properties in the test.

Suppose that we have a `utils.js` file that exports a `getWinner` function, and lets pretend that this function performs some expensive proccess like a request to an API.

```js
// utils.js

// Returns the winning player or null for a tie.
//
// Let's pretend that this function is performing an
// expensive network request or process for determinating
// the winner.
//
function getWinner(player1, player2) {
  const winningNumber = Math.random();
  return winningNumber < 1 / 3
    ? player1
    : winningNumber < 2 / 3
      ? player2
      : null;
}

module.exports = { getWinner };
```

And we have a function `thumbWar.js` that uses the `utils.getWinner` function.

```js
// thumbWar.js

const utils = require('./utils');

function thumbWar(player1, player2) {
  const numberToWin = 2;
  
  let player1Wins = 0;
  let player2Wins = 0;

  while (player1Wins < numberToWin && player2Wins < numberToWin) {
    const winner = utils.getWinner(player1, player2);
    if (winner === player1) {
      player1Wins++;
    } else if (winner === player2) {
      player2Wins++;
    }
  }

  return player1Wins > player2Wins ? player1 : player2;
}

module.exports = thumbWar;
```

If we want to test the function `thumbWar` in a production environment the test will be expensive, because it uses the `getWinner` function. In order to avoid the expensive process, we can override the `getWinner` function during the test.

```js
// __tests__/no-framework/monkey-patching.test.js

const thumbWar = require('../../thumb-war');
const utils = require('../../utils');

const originalGetWinner = utils.getWinner;

test('the thumbWar function', () => {
  // The function getWinner is overrided to avoid the expensive process
  utils.getWinner = (p1, p2) => p1;
  
  const winner = thumbWar('Diego Villa', 'Adolfo Jose');

  expect(winner).toBe('Diego Villa');

  // After we finish the test we need to return to the original function
  utils.getWinner = originalGetWinner;
});
```

## Mocking functions

Mock functions, also known as *spies*, are special functions that allow us to track how a particular function is called by external code. Using mock functions we can understand how the function was used.

Mock functions allows to override the orginal function behavior, and we can describe specif return values to suit our tests.

By using mock functions, we can know:

- The number of calls it received.
- The arguments values used in each invocation.
- The context (`this`) used in each invocation.

### When to use mock functions

We can use mock functions when:

- We want to replace a specific function return value.
- We want to check if a test is executing a function in a certain way.

### How works the `jest.fn`

The jest.fn is a `factory` method that creates mock functions. Each mock function has some special properties; `mock` is the most fundamental property. This property is an object that has all the mock state information about how the function was invoked.

The `mock` object contains three properties:

- `calls`: stores the properties used on each call.
- `instances`: stores the `this` values used on each invokation.
- `results`: stores how and with what values the function existed in each invokation.

**Jest** provides a set of custom matchers to check expectations about how the function was called. Some of them are:

- `expect(fn).toBeCalled()`
- `expect(fn).toBeCalledTimes(n)`
- `expect(fn).toBeCalledWith()`

```jsx
// __tests__/framework/mock-functions.test.js

const thumbWar = require('../../thumb-war');
const utils = require('../../utils');

test('the thumbWar function', () => {
  const originalGetWinner = utils.getWinner;
  
  // The function getWinner is overrided to avoid the expensive process
  utils.getWinner = jest.fn((p1, p2) => p1);

  const winner = thumbWar('Diego Villa', 'Adolfo Jose');

  expect(winner).toBe('Diego Villa');
  
  expect(utils.getWinner).toHaveBeenCalledTimes(2);
  expect(utils.getWinner).toHaveBeenCalledWith('Diego Villa', 'Adolfo Jose');
  expect(utils.getWinner).toHaveBeenNthCalledWith(
    1,
    'Diego Villa',
    'Adolfo Jose',
  );
  expect(utils.getWinner).toHaveBeenNthCalledWith(
    2,
    'Diego Villa',
    'Adolfo Jose',
  );

  // After we finish the test we need to return to the original function
  utils.getWinner = originalGetWinner;
});
```

```jsx
// __tests__/framework/mock-functions.test.js

const thumbWar = require('../../thumb-war');
const utils = require('../../utils');

test('the thumbWar function', () => {
  const originalGetWinner = utils.getWinner;

  // The function getWinner is overrided to avoid the expensive process
  utils.getWinner = jest.fn((p1, p2) => p1);

  const winner = thumbWar('Diego Villa', 'Adolfo Jose');
  expect(winner).toBe('Diego Villa');

  // It is a shortcut for toHaveBeenCalledTimes, toHaveBeenCalledWith,
  // and toHaveBeenNthCalledWith
  expect(utils.getWinner.mock.calls).toEqual([
    ['Diego Villa', 'Adolfo Jose'],
    ['Diego Villa', 'Adolfo Jose'],
  ]);

  // After we finish the test we need to return to the original function
  utils.getWinner = originalGetWinner;
});
```
### The `jest.spyOn` method

The `jest.spyOn` method is similar to the `jest.fn` method but also tracks calls to the `object[methodName]`. It has a method `mockRestore()` that returns to the original function.

```jsx
// __tests__/framework/mock-functions.test.js

const thumbWar = require('../../thumb-war');
const utils = require('../../utils');

test('the thumbWar function', () => {
  jest.spyOn(utils, 'getWinner');

  // The function getWinner is overrided to avoid the expensive process
  utils.getWinner.mockImplementation((p1, p2) => p1);

  const winner = thumbWar('Diego Villa', 'Adolfo Jose');
  expect(winner).toBe('Diego Villa');

  // It is a shortcut for toHaveBeenCalledTimes, toHaveBeenCalledWith,
  // and toHaveBeenNthCalledWith
  expect(utils.getWinner.mock.calls).toEqual([
    ['Diego Villa', 'Adolfo Jose'],
    ['Diego Villa', 'Adolfo Jose'],
  ]);

  // After we finish the test we need to return to the original function
  utils.getWinner.mockRestore();
});
```
