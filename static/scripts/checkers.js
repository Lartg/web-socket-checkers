var socket = io()
var turn = 1
var prep = null

document.getElementById('board').addEventListener('mousedown', prepMove)
document.getElementById('board').addEventListener('mouseup', move)

function prepMove(e){
  const checker = e.target
  const mouseOrigin = [e.clientX, e.clientY]
  prep = [checkTarget(checker, turn), getCheckerPosition(checker), checker, mouseOrigin]
  console.log(prep)
  return
}
function move(e){
  const destination = e.target
  const mouseVectorOrigin = prep[3]
  const mouseVectorDestination = [e.clientX, e.clientY]
  const mouseVector = [mouseVectorDestination[0]-mouseVectorOrigin[0], mouseVectorDestination[1]-mouseVectorOrigin[1]]
  const currentPosition = prep[1]
  const checker = prep[2]
  const checkerId = checker.id
  
  if(prep[0] == 'grey turn' && destination.className=='black'){
    moveGreyChecker(e, checkerId, currentPosition, mouseVector)
    turn+=1
  }
  else if(prep[0] == 'red turn' && destination.className=='black'){
    moveRedChecker(e, checkerId, currentPosition, mouseVector)
    turn+=1
  }
}



// helper functions
//-------------------------------------------------------------
function checkTarget(checker, turn){
  const checkChecker = checker.className
  if(checkChecker.includes('checker')){
    if(checkChecker.includes('grey')){
      if (turn%2 != 0){
        return 'grey turn'
      }
      else{
        return false
      }
    }
    else{
      if (turn%2 == 0){
        return 'red turn'
      }
      else{
        return false
      }
    }
  }
  else{
    return false
  }
}
//-------------------------------------------------------------
function getCheckerPosition(checker){
  // get postion
  x = checker.style.right
  y = checker.style.top

  // clean for operations
  x = parseInt(x.replace('px', ''))
  y = parseInt(y.replace('px', ''))

  position = [x, y]
  return position
}
//-------------------------------------------------------------
function moveRedChecker(e, checker, currentPosition, mouseVector){
  // down left
  if(mouseVector[0]>(-150)&&mouseVector[1]<(150)&&mouseVector[0]<(20)&&mouseVector[1]>20){
    currentPosition[0]+=80
    currentPosition[1]+=80
    updateGame(e, checker, currentPosition)
    return
    }
  //down right
  if(mouseVector[0]<(150)&&mouseVector[1]<(150)&&mouseVector[0]>(-20)&&mouseVector[1]>20){
    currentPosition[0]-=80
    currentPosition[1]+=80
    updateGame(e, checker, currentPosition)
    return
      }
  }
  
//-------------------------------------------------------------
function moveGreyChecker(e, checker, currentPosition, mouseVector){
  // up left
  if(mouseVector[0]>(-150)&&mouseVector[1]>(-150)&&mouseVector[0]<(20)&&mouseVector[1]<(-20)){
    currentPosition[0]+=80
    currentPosition[1]-=80
    updateGame(e, checker, currentPosition)
    return
    }
  //up right
  if(mouseVector[0]<(150)&&mouseVector[1]>(-150)&&mouseVector[0]>(-20)&&mouseVector[1]<(-20)){
    currentPosition[0]-=80
    currentPosition[1]-=80
    updateGame(e, checker, currentPosition)
    return
      }
  }
//-------------------------------------------------------------
function moveKingChecker(checker, currentPosition, mouseVector){
  
}
//-------------------------------------------------------------
//send and receive moves through socket
function updateGame(e, checker, currentPosition){
  e.preventDefault()
  
  socket.emit('updatePosition', {checker, currentPosition}) 
}
//-------------------------------------------------------------
// if mousedown e.target == checker && mouseup e.target == valid square => 
// delete checker div and create new one, and emit on socket
