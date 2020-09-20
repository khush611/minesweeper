
function Cell(i,j,w){
    this.i=i;
    this.j=j;
    this.x=i*w;
    this.y=j*w;
    this.w=w;
    this.neighborCount=0;
    this.bomb=false;
    this.revealed=false; // assume that for now all cells have bomb and are revealed
    this.marks=0;
    }
Cell.prototype.show=function(){
    stroke(0);// Setting the outline (stroke) to black.By adding the stroke() and fill() functions before something is drawn, we can set the color of any given shape
    noFill();
    rect(this.x,this.y,this.w,this.w);
    if(this.revealed) {
        if(this.bomb){
            fill(127);
            ellipse(this.x+this.w*0.5,this.y+this.w*0.5,this.w*0.5);
        } else{
            fill(200);//to make a grey cover
            rect(this.x,this.y,this.w,this.w);
            if(this.neighborCount>0){
            textAlign(CENTER);
            fill(0);
            text(this.neighborCount, this.x + this.w*0.5, this.y+this.w-6);

            }
        }
    }
}

Cell.prototype.countBombs = function(){
    if(this.bomb){// we dont want to check near a cell which already has a bomb. we need to check no.of bombs near  cell which doesnt have a bomb already
        this.neighborCount=-1;
        return;
    }
    var total = 0;
    for(var xoff=-1;xoff<=1;xoff++){
        for(var yoff=-1;yoff<=1;yoff++){
            var i = this.i+xoff;
            var j = this.j+yoff;
            if(i>-1 && i< cols && j>-1 && j<rows){
            var neighbor=grid[i][j];
            if(neighbor.bomb){
                total++;
            }
        }
        }
    }
    this.neighborCount=total;
}

Cell.prototype.contains = function(x,y){
return (x>this.x && x<this.x+this.w && y>this.y && y<this.y+this.w);//cursor points between a cell. so x point between left and right and y points between top & bottom
}

Cell.prototype.reveal=function(){
    this.revealed=true;//even if u click a cell nore times, once revealed=true, it means its true
    console.log(this.neighborCount);
    if(this.neighborCount==0){
        //flood fill time
        this.floodFill();
    }
}
Cell.prototype.floodFill=function(){
    for(var xoff=-1;xoff<=1;xoff++){
        for(var yoff=-1;yoff<=1;yoff++){
            var i = this.i+xoff;
            var j = this.j+yoff;
            if(i>-1 && i< cols && j>-1 && j<rows){
                var neighbor=grid[i][j];
                if(!neighbor.bomb && !neighbor.revealed){
                    neighbor.reveal();
            }
        }
   }
}
}