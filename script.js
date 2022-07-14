const Player = (marker) => {
    const setMarker = () => marker;
    return {
        setMarker
    };
};

const playGame = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    let num = 0;
    const playMarker = (cell) => {
        if (num === 0){
            num = 1;
            document.getElementById(cell.id).style.color = "#da9047";
            return ([player1.setMarker(), num]);
        }
        else if(num === 1){
            num = 0;
            return ([player2.setMarker(), num]);
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
                    // console.log(i,j,(document.getElementById(`${i}`+","+`${j}`).innerText), winCount);
                }
                if (winCount == 3){
                    return true;
                }    
            }
        }
    }
    
    return {
        player1, 
        player2, 
        playMarker, 
        checkForWinner,
    };
})();

const createBoard = (() => {
    const boardDisplay = document.getElementById("board");
    const endMessage = document.getElementById("end-message");
    let restartBtn = document.createElement("button");
    restartBtn.innerText = "Restart"
    const playMessage = document.getElementById("playing");
    playMessage.append("click the board to play: ");
    let playMessageMarker = document.createElement("p");
    playMessage.append(playMessageMarker);
    const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    let message = document.createElement("p");
    const initialCreate = (() => {
        create();
    })();
    function create(){
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                let cell = document.createElement("div");
                cell.className = "cell";
                cell.id = `${i},${j}`;
                cell.innerText = board[i][j];
                boardDisplay.append(cell);
                playMessageMarker.innerText = (playGame.player1.setMarker());
                cell.addEventListener("click", () => {gameClick(cell);}); 
            }
        }
    }
    const alertUser = (num) => {
        if (num === 0){
            playMessageMarker.innerText = playGame.player1.setMarker();
        }
        else if(num === 1){
            playMessageMarker.innerText = playGame.player2.setMarker();
        }
    }
    const gameClick = (cell) => {
        if (cell.innerText === ""){
            const returned = playGame.playMarker(cell);
            const toPlay = returned[0];
            const number = returned[1];
            console.log(toPlay, number)
            cell.innerText = toPlay;
            board[cell.id.charAt(0)][cell.id.charAt(2)] = toPlay;
            alertUser(number);
            if (playGame.checkForWinner(cell) == true){
                winner(toPlay);
            }
            else{
                let boardSpacePlayed = 0;
                for (let i = 0; i < 3; i++){ 
                    for (let j = 0; j < 3; j++){
                        if (board[i][j] != null){
                            boardSpacePlayed++;
                            if (boardSpacePlayed === 9){
                                tie();
                            }
                        }
                    }
                }
            }                
        }
    }
    const recreate = () => {
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                board[i][j] = null;
            }
        }
        boardDisplay.innerHTML = "";
        endMessage.innerHTML = "";
        create();   
    }
    const winner = (winnerMarker) => {
        for (let i = 0; i < 3; i++){ //removes all the event listener (since there is a winner)
            for (let j = 0; j < 3; j++){
                let toReplace = (document.getElementById(`${i}`+","+`${j}`));
                let replacement = toReplace.cloneNode(true);
                toReplace.parentNode.replaceChild(replacement, toReplace); //removing the event listener
            }
        }
        message.innerText = winnerMarker+" is the winner";
        end(message);
    }
    const tie = () => {
        message.innerText = "it is a tie";
        end(message);
    }
    const end = (message) => {
        endMessage.append(message);
        endMessage.append(restartBtn);
        restartBtn.addEventListener("click", () => {recreate();});
    }
    return {
        initialCreate
    };
})();






