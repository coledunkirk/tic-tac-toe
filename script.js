const playGame = (() => {
  const xClass = "x";
  const circleClass = "circle";
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const cellElements = Array.from(document.querySelectorAll('[data-cell]'));
  const winningMessage = document.querySelector('#winningMessage');
  const winningMessageText = document.querySelector('[data-winning-message-text]');
  const restartButton = document.querySelector('#restartButton');
  const board = document.querySelector('#board');
  let circleTurn;
  const endGame = (draw) => {
    if (draw) {
      winningMessageText.textContent = 'Draw';
    } else {
      winningMessageText.textContent = `${circleTurn ? "O's win" : "X's win"}`;
    }
    winningMessage.classList.add('show');
  }
  const isDraw = () => {
    return cellElements.every(cell => {
      return cell.classList.contains(xClass) || 
      cell.classList.contains(circleClass);
    });
  }
  const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
  }
  const swapTurns = () => {
    circleTurn = !circleTurn;
  }
  const setBoardHoverClass = () => {
    board.classList.remove(xClass);
    board.classList.remove(circleClass);
    if (circleTurn) {
      board.classList.add(circleClass);
    } else {
      board.classList.add(xClass);
    }
  }
  const checkWin = (currentClass) => {
    return winningCombinations.some(combination => {
      return combination.every(index => {
        return cellElements[index].classList.contains(currentClass);
      });
    });
  }
  const playTurn = (e) => {
    const cell = e.target;
    const currentClass =  circleTurn ? circleClass : xClass;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
      setBoardHoverClass();
    }
  } 
  const startGame = () => {
    circleTurn = false;
    cellElements.forEach(cell => {
      cell.classList.remove(xClass);
      cell.classList.remove(circleClass);
      cell.removeEventListener('click', playTurn);
      cell.addEventListener("click", playTurn, {once: true});
    });
    setBoardHoverClass();
    winningMessage.classList.remove('show');
  }
  restartButton.addEventListener('click', startGame);
  return {startGame};
})();

playGame.startGame();

