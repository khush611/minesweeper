//each cell must have a state : t or f
//where is the bomb :x,y,w,h
//revealed:t or f: if true we see:number, bomb, blank

function make2DArray(){
    //here we are making array a[col][row]. we can do this in regular way as well
    var arr=new Array(cols);
    for(var i=0;i<arr.length;i++){
        arr[i]=new Array(rows);
    }
    return arr;
}
function Cell(){
this.bomb=true;
this.revealed=true; // assume that for now all cells have bomb and are revealed
}
var grid;
var cols;
var rows;
var w=20;//20x20 cell
var totalBombs=20;
function setup(){
    createCanvas(201,201);//size of the canvas. if 400,400 then no of cols & rows will be:40,40, since 10px for col and 10pc for row
    cols=floor(width/w);
    rows=floor(height/w);
    grid=make2DArray(20,20);
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            grid[i][j]=new Cell(i, j, w);
        }
    }

    //pick totalBombs spots
    var options=[];
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            options.push([i,j]);
        }
    }
    console.log(options);
    for(var n=0;n<totalBombs;n++){
      var index=floor(random(options.length));
            //deletes that spot so it's no longer an option
      var choice = options[index];
      var i=choice[0];
      var j=choice[1];
      options.splice(index,1)
        grid[i][j].bomb=true;
    }





    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            grid[i][j].countBombs();
        }
    }
}

function gameOver(){
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            grid[i][j].revealed=true;
        }
    }
    alert("game over");
}

function mousePressed(){
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            if(grid[i][j].contains(mouseX,mouseY)){
                grid[i][j].reveal();//reveal whener mouse points to a cell
                if(grid[i][j].bomb){
                    gameOver();
                }
            }
        }
    }
}

function draw(){
    background(255);//gives color. argument ranges from 0 to 255
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            grid[i][j].show();// to see what's in these cells
        }
    }
}
