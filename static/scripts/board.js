const Board = [
  ['b','w','b','w','b','w','b','w'],
  ['w','b','w','b','w','b','w','b'],
  ['b','w','b','w','b','w','b','w'],
  ['w','b','w','b','w','b','w','b'],
  ['b','w','b','w','b','w','b','w'],
  ['w','b','w','b','w','b','w','b'],
  ['b','w','b','w','b','w','b','w'],
  ['w','b','w','b','w','b','w','b']
]

let redCounter = 1
let greyCounter = 1

for(row in Board){
  for(square in Board[row]){
    if(Board[row][square] == 'w'){
      var boardSquare = document.createElement('div')
      boardSquare.className = 'white'
      boardSquare.style.gridArea = row
      document.getElementById('board').insertAdjacentElement("beforeend", boardSquare)
    }
    else{
      var boardSquare = document.createElement('div')
      boardSquare.className = 'black'
      boardSquare.style.gridArea = row
      document.getElementById('board').insertAdjacentElement("beforeend", boardSquare)
      if(row < 3){
        var checker = document.createElement('div')
        checker.className = `red checker`
        checker.id = `red${redCounter}`
        checker.style.top = `${((row)*80)}px`
        checker.style.right = `${((square)*80)}px`
        redCounter += 1
        document.getElementById('board').insertAdjacentElement("beforeend", checker)
      }
      else if(row > 4){
        var checker = document.createElement('div')
        checker.className = `grey checker`
        checker.id = `grey${greyCounter}`
        checker.style.top = `${((row)*80)}px`
        checker.style.right = `${((square)*80)}px`
        greyCounter+=1
        document.getElementById('board').insertAdjacentElement("beforeend", checker)
      }
    }
  }
}