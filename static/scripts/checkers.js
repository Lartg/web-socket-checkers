var socket = io()
var turn = 1
var prep = null

document.getElementById('board').addEventListener('mousedown', prepMove)
document.getElementById('board').addEventListener('mouseup', move)

function prepMove(e){
  const checker = e.target
  const mouseOrigin = [e.clientX, e.clientY]
  prep = [checkTarget(checker, turn), getCheckerPosition(checker), checker, mouseOrigin]
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
    if(checker.className.includes('king')){
      moveKingChecker(e, checkerId, currentPosition, mouseVector, destination)
      return
    }
    moveGreyChecker(e, checkerId, currentPosition, mouseVector, destination)
    if(checkGreyPromote(checkerId, currentPosition)){
      promoteChecker(e, checkerId)
    }
    return
  }
  else if(prep[0] == 'red turn' && destination.className=='black'){
    if(checker.className.includes('king')){
      moveKingChecker(e, checkerId, currentPosition, mouseVector, destination)
      return
    }
    moveRedChecker(e, checkerId, currentPosition, mouseVector, destination)
    if(checkRedPromote(checkerId, currentPosition)){
      promoteChecker(e, checkerId)
    }
    return
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
function moveRedChecker(e, checker, currentPosition, mouseVector, destination){
  // down left
  if(mouseVector[0]>(-120)&&mouseVector[1]<(120)&&mouseVector[0]<(20)&&mouseVector[1]>20){
    currentPosition[0]+=80
    currentPosition[1]+=80
    updateGame(e, checker, currentPosition)
    return
    }
  //down right
  if(mouseVector[0]<(120)&&mouseVector[1]<(120)&&mouseVector[0]>(-20)&&mouseVector[1]>20){
    currentPosition[0]-=80
    currentPosition[1]+=80
    updateGame(e, checker, currentPosition)
    return
      }

  // capture down right
  if(mouseVector[0]>120&&mouseVector[0]<240&&mouseVector[1]>120&&mouseVector[1]<240){
    for(let i=1; i<=12; i++){
      const potentialCapture = document.getElementById(`grey${i}`)
      if(potentialCapture){
      const potentialCapturePosition = getCheckerPosition(potentialCapture)
      if(potentialCapturePosition[0]==(currentPosition[0]-80)&&potentialCapturePosition[1]==(currentPosition[1]+80)){
        if(destination.className.includes('black')){
          currentPosition[0]-=160
          currentPosition[1]+=160
          updateGame(e, checker, currentPosition)
          capturePiece(e, potentialCapture.id)
          return
        }
      }}
    }
  }
  // capture down left
  if(mouseVector[0]>(-240)&&mouseVector[0]<(-120)&&mouseVector[1]>120&&mouseVector[1]<240){
    for(let i=1; i<=12; i++){
      const potentialCapture = document.getElementById(`grey${i}`)
      if(potentialCapture){
      const potentialCapturePosition = getCheckerPosition(potentialCapture)
      if(potentialCapturePosition[0]==(currentPosition[0]+80)&&potentialCapturePosition[1]==(currentPosition[1]+80)){
        if(destination.className.includes('black')){
          currentPosition[0]+=160
          currentPosition[1]+=160
          updateGame(e, checker, currentPosition)
          capturePiece(e, potentialCapture.id)
          return
        }
      }}
    }
  }
  }
  
//-------------------------------------------------------------
function moveGreyChecker(e, checker, currentPosition, mouseVector, destination){
  // up left
  if(mouseVector[0]>(-120)&&mouseVector[1]>(-120)&&mouseVector[0]<(20)&&mouseVector[1]<(-20)){
    currentPosition[0]+=80
    currentPosition[1]-=80
    updateGame(e, checker, currentPosition)
    return
    }
  //up right
  if(mouseVector[0]<(120)&&mouseVector[1]>(-120)&&mouseVector[0]>(-20)&&mouseVector[1]<(-20)){
    currentPosition[0]-=80
    currentPosition[1]-=80
    updateGame(e, checker, currentPosition)
    return
      }

  // capture up right
  if(mouseVector[0]>120&&mouseVector[0]<240&&mouseVector[1]>(-240)&&mouseVector[1]<(-120)){
    for(let i=1; i<=12; i++){
      const potentialCapture = document.getElementById(`red${i}`)
      if(potentialCapture){
        const potentialCapturePosition = getCheckerPosition(potentialCapture)
        if(potentialCapturePosition[0]==(currentPosition[0]-80)&&potentialCapturePosition[1]==(currentPosition[1]-80)){
          if(destination.className.includes('black')){
            currentPosition[0]-=160
            currentPosition[1]-=160
            updateGame(e, checker, currentPosition)
            capturePiece(e, potentialCapture.id)
            return
          }
        }
      }
    }
  }
  // capture up left
  if(mouseVector[0]>(-240)&&mouseVector[0]<(-120)&&mouseVector[1]>(-240)&&mouseVector[1]<(-120)){
    for(let i=1; i<=12; i++){
      const potentialCapture = document.getElementById(`red${i}`)
      if(potentialCapture){
        const potentialCapturePosition = getCheckerPosition(potentialCapture)
        if(potentialCapturePosition[0]==(currentPosition[0]+80)&&potentialCapturePosition[1]==(currentPosition[1]-80)){
          if(destination.className.includes('black')){
            currentPosition[0]+=160
            currentPosition[1]-=160
            updateGame(e, checker, currentPosition)
            capturePiece(e, potentialCapture.id)
            return
          }
        }
      }
    }
  }
  }
//-------------------------------------------------------------
function checkGreyPromote(checkerId, currentPosition){
  if(currentPosition[1] == 0){
    return true
  }
  return false
}
//-------------------------------------------------------------
function checkRedPromote(checkerId, currentPosition){
  if(currentPosition[1] == 560){
    return true
  }
  return false
}

//-------------------------------------------------------------
function moveKingChecker(e, checker, currentPosition, mouseVector, destination){
  let oppositeColor = 'red'
  let color = 'grey'
  
  if(document.getElementById(checker).className.includes('red')){
    color = 'red'
    oppositeColor = 'grey'
  }
  // up left
  if(mouseVector[0]>(-120)&&mouseVector[1]>(-120)&&mouseVector[0]<(20)&&mouseVector[1]<(-20)){
    currentPosition[0]+=80
    currentPosition[1]-=80
    updateGame(e, checker, currentPosition)
    return
    }
  //up right
  if(mouseVector[0]<(120)&&mouseVector[1]>(-120)&&mouseVector[0]>(-20)&&mouseVector[1]<(-20)){
    currentPosition[0]-=80
    currentPosition[1]-=80
    updateGame(e, checker, currentPosition)
    return
      }

  // capture up right
  if(mouseVector[0]>120&&mouseVector[0]<240&&mouseVector[1]>(-240)&&mouseVector[1]<(-120)){
    for(let i=1; i<=12; i++){
      const potentialCapture = document.getElementById(`${oppositeColor}${i}`)
      if(potentialCapture){
        const potentialCapturePosition = getCheckerPosition(potentialCapture)
        if(potentialCapturePosition[0]==(currentPosition[0]-80)&&potentialCapturePosition[1]==(currentPosition[1]-80)){
          if(destination.className.includes('black')){
            currentPosition[0]-=160
            currentPosition[1]-=160
            updateGame(e, checker, currentPosition)
            capturePiece(e, potentialCapture.id)
            return
          }
        }
      }
    }
  }
  // capture up left
  if(mouseVector[0]>(-240)&&mouseVector[0]<(-120)&&mouseVector[1]>(-240)&&mouseVector[1]<(-120)){
    for(let i=1; i<=12; i++){
      const potentialCapture = document.getElementById(`${oppositeColor}${i}`)
      if(potentialCapture){
        const potentialCapturePosition = getCheckerPosition(potentialCapture)
        if(potentialCapturePosition[0]==(currentPosition[0]+80)&&potentialCapturePosition[1]==(currentPosition[1]-80)){
          if(destination.className.includes('black')){
            currentPosition[0]+=160
            currentPosition[1]-=160
            updateGame(e, checker, currentPosition)
            capturePiece(e, potentialCapture.id)
            return
          }
        }
      }
    }
  }
  // down left
  if(mouseVector[0]>(-120)&&mouseVector[1]<(120)&&mouseVector[0]<(20)&&mouseVector[1]>20){
    currentPosition[0]+=80
    currentPosition[1]+=80
    updateGame(e, checker, currentPosition)
    return
    }
  //down right
  if(mouseVector[0]<(120)&&mouseVector[1]<(120)&&mouseVector[0]>(-20)&&mouseVector[1]>20){
    currentPosition[0]-=80
    currentPosition[1]+=80
    updateGame(e, checker, currentPosition)
    return
      }

  // capture down right
  if(mouseVector[0]>120&&mouseVector[0]<240&&mouseVector[1]>120&&mouseVector[1]<240){
    for(let i=1; i<=12; i++){
      const potentialCapture = document.getElementById(`${oppositeColor}${i}`)
      if(potentialCapture){
      const potentialCapturePosition = getCheckerPosition(potentialCapture)
      if(potentialCapturePosition[0]==(currentPosition[0]-80)&&potentialCapturePosition[1]==(currentPosition[1]+80)){
        if(destination.className.includes('black')){
          currentPosition[0]-=160
          currentPosition[1]+=160
          updateGame(e, checker, currentPosition)
          capturePiece(e, potentialCapture.id)
          return
        }
      }}
    }
  }
  // capture down left
  if(mouseVector[0]>(-240)&&mouseVector[0]<(-120)&&mouseVector[1]>120&&mouseVector[1]<240){
    for(let i=1; i<=12; i++){
      const potentialCapture = document.getElementById(`${oppositeColor}${i}`)
      if(potentialCapture){
      const potentialCapturePosition = getCheckerPosition(potentialCapture)
      if(potentialCapturePosition[0]==(currentPosition[0]+80)&&potentialCapturePosition[1]==(currentPosition[1]+80)){
        if(destination.className.includes('black')){
          currentPosition[0]+=160
          currentPosition[1]+=160
          updateGame(e, checker, currentPosition)
          capturePiece(e, potentialCapture.id)
          return
        }
      }}
    }
  }
  
}
//-------------------------------------------------------------
//send and receive moves through socket
function updateGame(e, checker, currentPosition){
  e.preventDefault()
  socket.emit('updatePosition', {checker, currentPosition}) 
}
//-------------------------------------------------------------
function capturePiece(e, captureData){
  e.preventDefault()
  socket.emit('capture', captureData)
}
//-------------------------------------------------------------
function promoteChecker(e, checkerId){
  e.preventDefault()
  socket.emit('promote', checkerId)
}
//-------------------------------------------------------------
socket.on('updatePosition', function(checkerData){
  var checker = document.getElementById(checkerData['checker'])
  console.log(checker)
  checker.style.right = `${checkerData['currentPosition'][0]}px`
  checker.style.top = `${checkerData['currentPosition'][1]}px`
  turn+=1
})

socket.on('capture', function(captureData){
  var capture = document.getElementById(captureData)
  capture.remove()
})

socket.on('promote', function(checkerId){
  var promotedPiece = document.getElementById(checkerId)
  console.log(checkerId)
  promotedPiece.className = promotedPiece.className+' king'
  console.log(promotedPiece.className)
})