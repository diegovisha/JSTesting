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
