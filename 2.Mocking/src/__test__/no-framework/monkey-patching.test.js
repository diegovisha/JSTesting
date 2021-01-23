const thumbWar = require('../../thumb-war');
const utils = require('../../utils');

const originalGetWinner = utils.getWinner;

// The function getWinner is overrided to avoid the expensive process
utils.getWinner = (p1, p2) => p1;

test('the thumbWar function', () => {
  const winner = thumbWar('Diego Villa', 'Adolfo Jose');
  expect(winner).toBe('Diego Villa');
});

// After we finish the test we need to return to the original function
utils.getWinner = originalGetWinner;
