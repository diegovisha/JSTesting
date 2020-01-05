const { sum, substract } = require('./math');

function expect(actual) {
  return {
    toBe(expected) {
      if (result !== expected) {
        throw new Error(`${result} is not equal to ${expected}`);
      }
    }
  }
}

let result = 0;
let expected = 0;

// Test: sum()

result = sum(3, 7);
expected = 10;

expect(result).toBe(expected);

// Test: substract()

result = substract(7, 3);
expected = 4;

expect(result).toBe(expected);
