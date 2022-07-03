const boardDisplay = document.getElementById("board");

const board = [
    // [0,1,2],
    // [3,4,5],
    // [6,7,8]
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
const Player = (marker) => {
    const setMarker = () => marker;
    const switchPlayers = () => {};
    return {setMarker, switchPlayers};
};
const player1 = Player("X");
const player2 = Player("O");

let counter  = 0;
function playMarker(){
    while(counter < 10){
        if (counter % 2 == 0){
            counter++;
            return (player2.setMarker());
        }
        else if(counter % 2 == 1){
            counter++;
            return (player1.setMarker());
        }
    }
}

for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
        let cell = document.createElement("div");
        cell.className = "cell";
        cell.id = `${i},${j}`;
        cell.innerText = board[i][j];
        boardDisplay.append(cell);
        cell.addEventListener("click", () => {cell.innerHTML = playMarker()});

    }
}