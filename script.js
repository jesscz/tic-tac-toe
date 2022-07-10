const createBoard = (() => {
    const boardDisplay = document.getElementById("board");
    const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    const create = (() => {
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                let cell = document.createElement("div");
                cell.className = "cell";
                cell.id = `${i},${j}`;
                cell.innerText = board[i][j];
                boardDisplay.append(cell);
                function gameClick(){
                    if (cell.innerText === ""){
                        cell.innerText = playGame.playMarker();
                        if (playGame.checkForWinner(cell) === true){
                            for (let i = 0; i < 3; i++){
                                    for (let j = 0; j < 3; j++){
                                        cell.removeEventListener("click", () => {gameClick();});
                                    }
                                }
                        }
                    }
                }
                cell.addEventListener("click", () => {gameClick();});
                            // 
                
            }
        }
    
    })();
})();

const Player = (marker) => {
    const setMarker = () => marker;
    return {setMarker};
};



const playGame = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    let counter  = 0;
    const playMarker = () => {
        while(counter < 9){
            if (counter % 2 == 0){
                counter++;
                return (player1.setMarker());
            }
            else if(counter % 2 == 1){
                counter++;
                return (player2.setMarker());
            }
        }
    }
    const checkForWinner = (cell) => {
        let winCount = 0;
        let varToMatch = cell.innerText;
        const id = cell.id;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if ((document.getElementById(`${i}`+","+`${j}`).innerText === varToMatch)){
                    if (i == 0){ //horizontal
                        let k = 0;
                        if ((document.getElementById(`${i}`+","+`${k}`)).innerText === (document.getElementById(`${i}`+","+`${k+1}`)).innerText && (document.getElementById(`${i}`+","+`${k}`)).innerText === (document.getElementById(`${i}`+","+`${k+2}`)).innerText){
                            winCount++;
                        }
                        if ((document.getElementById(`${i}`+","+`${i}`)).innerText != "" && (document.getElementById(`${i}`+","+`${i}`)).innerText === (document.getElementById(`${(i+1)}`+","+`${(i+1)}`)).innerText && (document.getElementById(`${i}`+","+`${i}`)).innerText === (document.getElementById(`${(i+2)}`+","+`${(i+2)}`)).innerText){
                            winCount = 3;
                        }
                        if ((document.getElementById(`${i}`+","+`${(i+2)}`)).innerText != "" && (document.getElementById(`${i}`+","+`${(i+2)}`)).innerText === (document.getElementById(`${(i+1)}`+","+`${(i+1)}`)).innerText && (document.getElementById(`${(i+2)}`+","+`${i}`)).innerText === (document.getElementById(`${i}`+","+`${(i+2)}`)).innerText){
                            winCount = 3;
                        }
                    }
                    if (i == 1){ //horizontal
                        let k = 0;
                        if ((document.getElementById(`${i}`+","+`${k}`)).innerText === (document.getElementById(`${i}`+","+`${k+1}`)).innerText && (document.getElementById(`${i}`+","+`${k}`)).innerText === (document.getElementById(`${i}`+","+`${k+2}`)).innerText){
                            winCount++;
                        }
                    }
                    if (i == 2){ //horizontal
                        let k = 0;
                        if ((document.getElementById(`${i}`+","+`${k}`)).innerText === (document.getElementById(`${i}`+","+`${k+1}`)).innerText && (document.getElementById(`${i}`+","+`${k}`)).innerText === (document.getElementById(`${i}`+","+`${k+2}`)).innerText){
                            winCount++;
                        }
                    }
                    if (j == 0){ //vertical
                        let k = 0;
                        if ((document.getElementById(`${k}`+","+`${j}`)).innerText === (document.getElementById(`${k+1}`+","+`${j}`)).innerText && (document.getElementById(`${k}`+","+`${j}`)).innerText === (document.getElementById(`${k+2}`+","+`${j}`)).innerText){
                            winCount++;
                        }
                    } 
                    if (j == 1){ //vertical
                        let k = 0;
                        if ((document.getElementById(`${k}`+","+`${j}`)).innerText === (document.getElementById(`${k+1}`+","+`${j}`)).innerText && (document.getElementById(`${k}`+","+`${j}`)).innerText === (document.getElementById(`${k+2}`+","+`${j}`)).innerText){
                            winCount++;
                        }
                    }  
                    if (j == 2){ //vertical
                        let k = 0;
                        if ((document.getElementById(`${k}`+","+`${j}`)).innerText === (document.getElementById(`${k+1}`+","+`${j}`)).innerText && (document.getElementById(`${k}`+","+`${j}`)).innerText === (document.getElementById(`${k+2}`+","+`${j}`)).innerText){
                            winCount++;
                        }
                    } 
                    console.log(i,j,(document.getElementById(`${i}`+","+`${j}`).innerText), winCount)
                }
                if (winCount == 3){
                    return true;
                }    
            }
        }
    }  
            
            
        
    
    return {playMarker, checkForWinner};
})();


