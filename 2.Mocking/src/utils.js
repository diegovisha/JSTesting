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
