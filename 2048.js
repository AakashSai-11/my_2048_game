let board;
let score = 0;
let rows = 4;
let columns = 4;
let highscore = 0;

window.onload = function (){
    setgame();
}

function setgame(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    // board = [
    //     [2,2,2,2],
    //     [2,2,2,2],
    //     [4,4,8,8],
    //     [4,4,8,8]
    // ]

    for(let r = 0; r<rows; r++){
        //<div></div> ikkada oka div tag create chesthunnam (basic ga tile window start ayyaka) like creating all empty tiles when game starts
        for(let c=0; c<columns ; c++){
            let tile = document.createElement("div");
            tile.setAttribute("id",r.toString()+ '-' + c.toString());
            let num = board[r][c];
            updatetile(tile,num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}

function updatetile(tile,num){
    tile.textContent = "";
    //motham clear chesthunnam lopala text
    tile.classList.value = "";
    //classes anni thesesi relevant dhi add cheseyadam
    tile.classList.add("tile");
    if(num > 0){
        tile.textContent = num;
        if(num <= 4096){
            tile.classList.add("x"+num.toString());
        } else{
            tile.classList.add("x8192");
        }
    }
}


function filterZero(row){
    let new_row = [];
    for(let len = 0; len<row.length; len++){
        if (row[len] !== 0){
            new_row.push(row[len]);
        }
    }
    return new_row  // arrays lo zeroes thesesi kothadi return avthundi

    // return row.filter(num => num!= 0);

}


function slide(row){
    //[0,2,2,2]
    row = filterZero(row)
    //[2,2,2]

    for(let i=0; i<row.length - 1;i++){
        //checking anni 2's
        if(row[i]===row[i+1]){
            row[i] = row[i]*2;
            row[i+1] = 0;
            score += row[i];
            check();
        }

    }
    // [2,2,2] => [4,0,2]
    row = filterZero(row);

    //now add zeroes
    while(row.length < columns){
        row.push(0);
    }//[4,2,0,0]

    return row;

}


document.addEventListener("keyup", function(event){
    if(event.key === "ArrowLeft"){
        if(!hasEmptyTile()){
            document.getElementById('result').classList.remove("result");
            let audio = new Audio("A_.mp3");
            audio.play();
            check();
        } else {
            slideLeft();
            setTwo();
        }
    }
    else if(event.code === "ArrowRight"){
        if(!hasEmptyTile()){
            document.getElementById('result').classList.remove("result");
            let audio = new Audio("A_.mp3");
            audio.play();
            check();
        }else{
        slideRight();
        setTwo();
        }
    }
    else if(event.code === "ArrowUp"){
        if(!hasEmptyTile()){
            document.getElementById('result').classList.remove("result");
            let audio = new Audio("A_.mp3");
            audio.play();
            check();
        }else{
        slideUp();
        setTwo();
        }
    }
    else if (event.key === "ArrowDown"){
        if(!hasEmptyTile()){
            document.getElementById('result').classList.remove("result");
            let audio = new Audio("A_.mp3");
            audio.play();
            check();
        }else{
        slideDown();
        setTwo();
        }
    }

    document.getElementById('score').textContent = score;
});

function slideLeft(){
    for(let r=0;r<rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for(let c = 0;c < columns; c++){
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updatetile(tile,num);
        }
    }
}

function slideRight(){
    for(let r=0;r<rows; r++){
        let row = board[r];
        row = row.reverse();
        row = slide(row);
        row = row.reverse();
        board[r] = row;

        for(let c = 0;c < columns; c++){
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updatetile(tile,num);
        }
    }
}

function slideUp(){
    // board[0][c] = row[0];
    // board[1][c] = row[1];
    // board[2][c] = row[2];
    // board[3][c] = row[3];
    for( let c=0; c<columns;c++){
        let row = [board[0][c],board[1][c],board[2][c],board[3][c]];
        row = slide(row);
        for(let r = 0;r < columns; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updatetile(tile,num);
        }
    }
}

function slideDown(){
    for( let c=0; c<columns;c++){
        let row = [board[0][c],board[1][c],board[2][c],board[3][c]];
        row = row.reverse();
        row = slide(row);
        row = row.reverse();
        for(let r = 0;r < columns; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updatetile(tile,num);
        }
    }
}

function setTwo(){
    //setting up 2's at random positions
    if(!hasEmptyTile()){
        return;
    }

    let found = false;
    while(!found){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if(board[r][c] === 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.textContent = '2';
            tile.classList.add('x2');
            found = true;
        }
    }
}

function hasEmptyTile(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<rows;c++){
            if(board[r][c] === 0){
                return true;
            }
        }
    }
    return false;
}

document.getElementById("restartButton").addEventListener("click", restartGame);

function restartGame() {
    document.getElementById('result').classList.add('result');
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('board').innerHTML = "";
    setgame();
}

function check(){
    if(score > highscore){
        highscore = score;
        document.getElementById('Highscore').textContent = highscore;
    }
}