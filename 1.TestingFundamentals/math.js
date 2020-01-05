const sum = (a, b) => a + b;
const substract = (a, b) => a - b;

const sumAsync = (...args) => Promise.resolve(sum(...args));
const substractAsync = (...args) => Promise.resolve(substract(...args));

module.exports = {
  sum,
  substract,
  sumAsync,
  substractAsync,
};
