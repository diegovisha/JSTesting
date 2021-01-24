const thumbWar = require('../../thumb-war');
const utils = require('../../utils');

jest.mock('../../utils');

test('the thumbWar function', () => {
  const winner = thumbWar('Diego Villa', 'Adolfo Jose');

  expect(winner).toBe('Diego Villa');
  expect(utils.getWinner.mock.calls).toEqual([
    ['Diego Villa', 'Adolfo Jose'],
    ['Diego Villa', 'Adolfo Jose'],
  ]);

  // After we finish the test we need to return to the original function
  utils.getWinner.mockReset();
});
