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
      if(row < 4 && row > 0){
        var checker = document.createElement('div')
        checker.className = `red ${row} ${square}`
        boardSquare.insertAdjacentElement("beforeend", checker)
      }
      else if(row > 5 || row == 0){
        var checker = document.createElement('div')
        checker.className = `grey ${row} ${square}`
        boardSquare.insertAdjacentElement("beforeend", checker)
      }
    }
  }
}