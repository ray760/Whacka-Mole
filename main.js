((global) => {
  /* Assign HTML elements to a variable. */
  const score = document.querySelector('.score'); 
  const buttons = document.querySelector('.buttons');
  const messageEl = document.querySelector('.game-message');
  const moles = document.querySelectorAll('.mole');

  let endGame = false;
  let gameTimer = null;
  let inPlay = false;
  let points = 0;
  let previousMole;

  /* 
    Button click happens here on parent element click 
    using target and switch case.
  */
  buttons.addEventListener( 'click', (e) => {
    e.preventDefault();
    const clickedButton = e.target.textContent.toLowerCase();
  
    switch(clickedButton) {
      case 'start':
      startGame();
      break

      case 'stop':
      stopGame();
      break

      case 'reset':
      resetGame();
      break
    }
  
  });

  /* 
    Add event listener for mole whack
  */
  moles.forEach( mole => { 
    mole.addEventListener('click', (e) => {
      if(!e.isTrusted) { return }
      e.target.classList.remove('up');
      points++;
      score.textContent = points;
    })
  })

  /* Returns durtion for how long mole shows */
  const moleTimer = (min, max) => {
    return Math.round( Math.random() * (max - min) + min );
  }

  /* Returns which mole should pop up */
  const whichMole = () => {
    const index = Math.floor( Math.random() * moles.length );
    const thisMole = moles[index];

    if(thisMole === previousMole )
      return showaMole();

    previousMole = thisMole;

    return thisMole;
  }

  /* Adds class for mole up and how long it shoul stay up */
  const showaMole = () => {
    const timer = moleTimer(750, 1000);
    const mole = whichMole();

    mole.classList.add('up');
    setTimeout(() => {
      mole.classList.remove('up');
      if(!endGame) {
        showaMole(); 
      }
      
    }, timer);
  }

  /* Starts game  when start button clicked */
  const startGame = () => {
    if(inPlay) { return }
    resetVars();
    showaMole();
    inPlay = true;
    
    gameTimer = setTimeout( () => { 
      endGame = true;
      inPlay = false;
      clearTimeout(gameTimer);
      gameTimer = null;
      gameMessage('Game Over! Hit Start to play again.');
    }, 5000 );
  }

  /* Stops game when stop button clicked */
  const stopGame = () => {
    if(endGame) { return }
    endGame = true;
    inPlay =false;
  }

  /* Function to reset game variables */
  const resetVars = () => {
    clearTimeout(gameTimer);
    gameTimer = null;
    points = 0;
    messageEl.textContent = '';
    score.textContent = points;
    endGame = false;
  }

  /* Function to refresh game and reset everything */
  const resetGame = () => {
    window.location.reload();
  }

  /* Function to show end game message */
  const gameMessage = (msg) => {
    messageEl.textContent = msg;
  }

})(window)