const { sum, substract, sumAsync, substractAsync } = require('./math');

async function test(title, callback) {
  try {
    await callback();
    console.log(`✓ ${title}`);
  } catch (error) {
    console.error(`✕ ${title}`);
    console.error(error);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    }
  }
}

// Test: sum()

test("sum adds numbers", () => {
  const result = sum(3, 7);
  const expected = 10;

  expect(result).toBe(expected);
});

// Test: substract()

test("substract substracts numbers", () => {
  const result = substract(7, 3);
  const expected = 4;

  expect(result).toBe(expected);
});

// Test: sumAsync()

test("sumAsync adds numbers", async () => {
  const result = await sumAsync(3, 7);
  const expected = 10;

  expect(result).toBe(expected);
});

// Test: substractAsync()

test("substractAsync substracts numbers", async () => {
  const result = await substractAsync(7, 3);
  const expected = 4;

  expect(result).toBe(expected);
});

