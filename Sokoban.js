var playerX;
var playerY;

window.onload = function(){
    
    
    const left_arrow   = 37;
    const up_arrow	   = 38;
    const right_arrow  = 39;
    const down_arrow   = 40;

    PrintBoard();

    
    window.onkeydown= function(gfg)
    {     
        switch(gfg.keyCode)
        {
            case left_arrow:
                move(-1,0);
                break;
            case right_arrow:
                move(1,0);
                break;
            case up_arrow:
                move(0,-1);
                break;
            case down_arrow:
                move(0,1);
                break;
        }
        gfg.preventDefault();    
        return false;
    };   
}


function makeXY(x,y)
{
    return "c" + x + "r" + y;
}

function GetElementXY(x,y)
{
    return  document.getElementById(makeXY(x,y));
}

function move(x,y)
{
    var newX = playerX + x;
    var newY = playerY + y;
    var canMove = false;
    var elementAtNewXY = GetElementXY( newX,newY);
    var oldElement = GetElementXY( playerX,playerY);

    if((elementAtNewXY.className == Entities.Block)||
       (elementAtNewXY.className == Entities.BlockDone))
    {
        // can rock move to new pos, if so move rock
        var rockX = (2 * x) + playerX;
        var rockY = (2 * y) + playerY;
        var nextElement =  GetElementXY( rockX,rockY);

         
        if( nextElement.className == Tiles.Goal )
        {  
            nextElement.className = Entities.BlockDone;
             canMove = true;
        }
        else if(nextElement.className == Tiles.Space)
        {
            nextElement.className = Entities.Block;
            canMove = true;
        }

    }
    if(elementAtNewXY.className == Tiles.Space)
      canMove = true;
    else if(elementAtNewXY.className == Tiles.Goal)
      canMove = true;   

    if(canMove)
    {
        if(InWinningArea(playerX,playerY))
            oldElement.className = Tiles.Goal;
        else
            oldElement.className = Tiles.Space;

        elementAtNewXY.className = Entities.Character;
        playerX = newX
        playerY = newY;
      
        if(CheckForWin())
        {
            var label = document.createElement("H1");
            label.textContent = "You have won!";
            document.body.appendChild(label);            
        }
    }
}




function PrintBoard()
{
    for (var row = 0; row < 16; ++row){           
        var rowelement = document.createElement("DIV");
        rowelement.className = "row";
                
        for (var col = 0; col < 19; ++col){
          var square = document.createElement("DIV")
          square.style.border = "solid";
          square.id = makeXY(col,row);
          
          var string =  tileMap01.mapGrid[row][col];
          if(string == "B")
          {
            square.className = Entities.Block; 
          }
            
          else if(string == " ")
          {
            square.className = Tiles.Space;
          }
          else if(string == "P")
          {
              playerX = col;
              playerY = row;
              square.className = Entities.Character;
          }
            
          else if(string == "W")
          {
            square.className = Tiles.Wall;
          }
            
          else if(string == "G")
          {
            square.className = Tiles.Goal;
          }                                        
            rowelement.appendChild(square)
        }
        document.body.appendChild(rowelement)        
     }
}


var haveWon = false;
function CheckForWin()
{
    if(haveWon)
      return false;
  if(
    (GetElementXY(16,9).className == Entities.BlockDone)
      &&
    (GetElementXY(16,10).className == Entities.BlockDone)
      &&
    (GetElementXY(16,11).className == Entities.BlockDone)
      &&
    (GetElementXY(17,9).className == Entities.BlockDone)
      &&
    (GetElementXY(17,10).className == Entities.BlockDone)
      &&
    (GetElementXY(17,11).className == Entities.BlockDone)
  )
  {
    haveWon = true;
    return true;
  }
  else
    return false;    
}


function InWinningArea(x, y)
{
return ((y > 8 ) &&
        (y < 12) &&
        (x < 18) &&
        (x > 15));
}

