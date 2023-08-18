let current_turn = 0;
let can_play = true;
let grid_item = document.querySelector("grid-item")
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
        let winnerMessage = document.getElementById("winnermessage");
        winnerMessage.innerText = `bien joué, c'est joueur ${player} qui a gagné (notamment)`;

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



