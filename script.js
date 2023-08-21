let grid_container = document.querySelectorAll("grid-container")
let current_turn = 0;
const canvas = document.querySelector('#confetti-canvas');
let can_play = true;
let tie = false;
let grid_item = document.querySelector("grid-item")
let l1c1 = document.getElementById("l1c1")
let grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

function checkVictory(player) {
    // player = 1/2
    return checkLines(player) || checkColumns(player) || checkDiagonals(player);
}

function showVictory(player){

    for(let i = 0; i<3; i++){
        if (checkLine(i, player) === true){
            document.getElementById("l" + (i+1) + "c1").style.color = "green";
            document.getElementById("l" + (i+1)+ "c2").style.color = "green";
            document.getElementById("l" + (i+1)+ "c3").style.color = "green";
        }
      }
      for(let i = 0; i<3; i++){
        if (checkColumn(i, player) === true){
            document.getElementById("l1" + "c" + (i+1)).style.color = "green";
            document.getElementById("l2" + "c" + (i+1)).style.color = "green";
            document.getElementById("l3" + "c" + (i+1)).style.color = "green";
        }
      }
      for(let i = 0; i<3; i++){
        if (checkfirstDiagonal(i, player) === true){
            document.getElementById("l1c1").style.color = "green";
            document.getElementById("l2c2").style.color = "green";
            document.getElementById("l3c3").style.color = "green";
        }
      }
      for(let i = 0; i<3; i++){
        if (checksecondDiagonal(i, player) === true){
            document.getElementById("l3c1").style.color = "green";
            document.getElementById("l2c2").style.color = "green";
            document.getElementById("l1c3").style.color = "green";
        }
      }
        let winnerMessage = document.getElementById("winnermessage");
        winnerMessage.innerText = `bien joué, c'est joueur ${player} qui a gagné (notamment)`;
        if (tie){
            winnerMessage.innerText = `égalité`;
        }
        if (tie === false){
            var myConfetti = confetti.create(canvas, {
                resize: true,
                useWorker: true
              });
              myConfetti({
                particleCount: 100,
                spread: 160
              });
        }
        resetButton = document.createElement("button");
        resetButton.textContent = "démarrer une nouvelle partie";
        document.body.appendChild(resetButton);
        resetButton.addEventListener("click", event => {
            resetGame();
            removeResetButton();
            cleanColor();
            winnerMessage.innerText = ``;
          });

}

function resetGame(){
    current_turn = 0;
    can_play = true;
    tie = false;
    grid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    refreshGrid();
}

function removeResetButton(){
    resetButton.parentNode.removeChild(resetButton);
}

function cleanColor(){
    for(let i = 0; i<3; i++){
        document.getElementById("l1" + "c" + (i+1)).style.color = "black";
        document.getElementById("l2" + "c" + (i+1)).style.color = "black";
        document.getElementById("l3"  + "c" + (i+1)).style.color = "black";
        document.getElementById("l" + (i+1) + "c1").style.color = "black";
        document.getElementById("l" + (i+1) + "c2").style.color = "black";
        document.getElementById("l" + (i+1) + "c3").style.color = "black";
    }
}

function checkLine(line, player) {
    let current_line = grid[line];
    for (let i = 0; i < 3; i++) {
        if (current_line[i] !== player) {
            return false;
        }

    }
    return true;

}

function checkColumn(column, player) {
    for (let i = 0; i < 3; i++) {
        if (grid[i][column] !== player) {
            return false;
        }
    }
    return true;

}

function checkDiagonals(player) {
    let first_diagonal = grid[0][0] === player && grid[1][1] === player && grid[2][2] === player;
    let second_diagonal = grid[0][2] === player && grid[1][1] === player && grid[2][0] === player;
    return first_diagonal || second_diagonal;
}

function checkfirstDiagonal(player) {
   if (grid[0][0] === player && grid[1][1] === player && grid[2][2] === player){
    return true;
   }

}

function checksecondDiagonal(player) {
    
   if(grid[0][2] === player && grid[1][1] === player && grid[2][0] === player){
    return true;
   }
}


function checkLines(player) {
    for (let i = 0; i < 3; i++) {
        if (checkLine(i, player) === true) {
            return true;
        }
    }

    return false;
}

function checkColumns(player) {
    for (let i = 0; i < 3; i++) {
        if (checkColumn(i, player) === true) {
            return true
        }
    }
    return false;
}

function play(line, column, player) {
    // line = 0/1/2
    // column = 0/1/2
    // player = 1/2
    if (grid[line][column] === 0) {
        grid[line][column] = player;
        return true;
    }
    return false;

}

function refreshGrid() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let line = i + 1;
            let column = j + 1;
            let id = "l" + line + "c" + column;
            let element = document.getElementById(id);
            if(grid[i][j] === 0){
                element.innerText = "";
            }
            if(grid[i][j] === 1) {
                element.innerText = "x";
            }   else if(grid[i][j] === 2) {
                element.innerText = "o";
            }

        }
    }
}

function makeMove(line, column) {
    if (can_play === false){
        return;
    }
    let player = current_turn % 2 + 1;
    if (play(line, column, player)) {
        current_turn++;
        refreshGrid();
        if (checkVictory(player) === false && current_turn === 9){
            tie = true
            can_play = false;
            showVictory(player);

        } 

        if (checkVictory(player)){
            can_play = false;
            showVictory(player);
        } 
    }
}

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let line = i + 1;
        let column = j + 1;
        let id = "l" + line + "c" + column;
        let element = document.getElementById(id);
        element.addEventListener("click", event => {
            makeMove(i, j);
        });
    }
}



