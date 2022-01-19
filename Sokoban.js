

var playerX;
var playerY;

window.onload = function(){
    
    
    const left_arrow   = 37;
    const up_arrow	   = 38;
    const right_arrow  = 39;
    const down_arrow   = 40;

    
    window.onkeydown= function(gfg)
    {
        switch(gfg.keyCode)
        {
            case left_arrow:
                move(0,-1);
                break;
            case right_arrow:
                move(0,1);
                break;
            case up_arrow:
                move(-1,0);
                break;
            case down_arrow:
                move(1,0);
                break;
        }    
        return false;
    };   
    PrintBoard();
    
    document.body.focus() 
}

function move(x,y)
{
    
    var newX = playerX + x;
    var newY = playerY + y;
    var canMove = false;
    
    if(tileMap01.mapGrid[newX][newY] == "B")
    {
        // can rock move to new pos, if so move rock
        var rockX = (2 * x) + playerX;
        var rockY = (2 * y) + playerY;
        if(tileMap01.mapGrid[rockX][rockY] == " " ||
           tileMap01.mapGrid[rockX][rockY] == "G")

         {  
             tileMap01.mapGrid[rockX][rockY] = "B";
             if(InWinningArea(newX,newY))
               tileMap01.mapGrid[newX][newY] = "G";
             else
               tileMap01.mapGrid[newX][newY] = " ";
             canMove = true;
        }
    }
    else if(tileMap01.mapGrid[newX][newY] == " ")
      canMove = true;
    else if(tileMap01.mapGrid[newX][newY] == "G")
      canMove = true;   

    if(canMove)
    {
      playerX = newX
      playerY = newY;
      PrintBoard();
    }
}



const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};


function PrintBoard()
{
    removeChilds(document.body)
    for (var row = 0; row < 16; ++row){           
        var rowelement = document.createElement("DIV");
        rowelement.className = "row"
                
        for (var col = 0; col < 19; ++col){
          var square = document.createElement("DIV")
          square.className = "square"
          square.style.border = "solid";
          
          var string =  tileMap01.mapGrid[row][col];
            if(( playerX == row) && (playerY == col))
            {
              square.style.backgroundColor = "yellow";   
            }
          else if(string == "B")
            square.style.backgroundColor = "red";
          else if(string == " ")
            square.style.backgroundColor = "white";
          else if(string == "P")
          {
              playerX = col;
              playerY = row;
              square.style.backgroundColor = "yellow";
            /* just remove P and change to blank*/
            tileMap01.mapGrid[row][col] = " ";
          }
            
          else if(string == "W")
            square.style.backgroundColor = "black";
          else if(string == "G")
            square.style.backgroundColor = "green";
                            
            rowelement.appendChild(square)
        }
        document.body.appendChild(rowelement)        
     }
     if(CheckForWin())
        {
            var label = document.createElement("H1");
            label.textContent = "You have won!";
            document.body.appendChild(label);
        }
}
function CheckForWin()
{
    if(
     (tileMap01.mapGrid[9][16] === "B")
     &&

     (tileMap01.mapGrid[10][16] === "B")
     &&
     (tileMap01.mapGrid[11][16] === "B")
     &&
     (tileMap01.mapGrid[9][17] === "B")
     &&
     (tileMap01.mapGrid[10][17] === "B")
     &&
     (tileMap01.mapGrid[11][17] === "B")
     )
     return true;
    else
      return false; 
}

function InWinningArea(x, y)
{
return ((x > 8 ) &&
        (x < 12) &&
        (y < 18) &&
        (y > 15));
}

