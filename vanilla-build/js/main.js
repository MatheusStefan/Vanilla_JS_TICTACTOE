const App = {
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
  },

  //register all user events
  init() {
    App.$.menu.addEventListener("click", (event) => {
      App.$.menuItems.classList.toggle("hidden");
    });

    App.$.resetBtn.addEventListener("click", (event) => {
      console.log("Reset the game");
    });
    App.$.newRoundBtn.addEventListener("click", (event) => {
      console.log("Add new round");
    });

    App.$.squares.forEach(square => {
        square.addEventListener('click', event => {
            console.log(`Square with id ${event.target.id} was clicked`)
        })
    })
  },
};

window.addEventListener("load", App.init);
