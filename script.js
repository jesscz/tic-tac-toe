const boardDisplay = document.getElementById("board");

const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
const Player = (marker) => {
    const setMarker = () => marker;
    return {setMarker};
};
const player1 = Player("X");
const player2 = Player("O");


const markerSetter = (() =>{
    let counter  = 0;
    const count = () => {
        while(counter < 9){
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
    return {count};
})();


for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
        let cell = document.createElement("div");
        cell.className = "cell";
        cell.id = `${i},${j}`;
        cell.innerText = board[i][j];
        boardDisplay.append(cell);
        cell.addEventListener("click", () => {
            if (cell.innerText === ""){
                cell.innerHTML = markerSetter.count();
            }
        });

    }
}