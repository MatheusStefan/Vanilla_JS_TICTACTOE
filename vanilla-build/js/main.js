const App = {
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
    modal: document.querySelectorAll('[data-id=modal]'),
    modalText: document.querySelectorAll('[data-id=modal-text]'),
    modalBtn: document.querySelectorAll('[data-id=modal-btn]'),
  },

  state: {
    moves: [],
  },

  getGameStatus(moves) {
    
    const p1Moves = moves.filter(move => move.playerId === 1).map(move => +move.squareId)
    const p2Moves = moves.filter(move => move.playerId === 2).map(move => +move.squareId)

    const winningPatterns = [
        [1, 2, 3],
        [1, 5, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 5, 7],
        [3, 6, 9],
        [4, 5, 6],
        [7, 8, 9],
      ];

      let winner = null
      winningPatterns.forEach(pattern => {
        const p1Wins = pattern.every(value => p1Moves.includes(value))
        const p2Wins = pattern.every(value => p2Moves.includes(value))

        if(p1Wins) winner = 1
        if(p2Wins) winner = 2
    })
    
    return {
        status: moves.length === 9 || winner != null ? 'complete' : 'in-progress',
        winner
    }
},

  //register all user events
  init() {
    App.registerEventListeners();
  },
  registerEventListeners() {
    App.$.menu.addEventListener("click", (event) => {
      App.$.menuItems.classList.toggle("hidden");
      console.log("Show the menu");
    });

    App.$.resetBtn.addEventListener("click", (event) => {
      console.log("Reset the game");
    });
    App.$.newRoundBtn.addEventListener("click", (event) => {
      console.log("Add new round");
    });

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        const hasMove = (squareId) => {
          const existingMove = App.state.moves.find(
            (move) => move.squareId === squareId
          );
          return existingMove !== undefined;
        };
        if (hasMove(+square.id)) {
          return;
        }
        const lastMove = App.state.moves.at(-1);
        const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
        console.log(App.state);
        const currentPlayer =
          App.state.moves.length === 0
            ? 1
            : getOppositePlayer(lastMove.playerId);
        const icon = document.createElement("i");
        if (currentPlayer === 1) {
          icon.classList.add("fa-solid", "fa-x", "turquoise");
        } else {
          icon.classList.add("fa-solid", "fa-o", "yellow");
        }

        App.state.moves.push({
          squareId: +square.id,
          playerId: currentPlayer,
        });

        square.replaceChildren(icon);
        const game = App.getGameStatus(App.state.moves)
        if(game.status === 'complete') {
            if(game.winner) {
                alert(`Player ${game.winner} wins!`)
            } else {
                alert('Tie!')
            }
        }
      });
    });
  },
};

window.addEventListener("load", App.init);
