const Board = [
  ['w','b','w','b','w','b','w','b'],
  ['b','w','b','w','b','w','b','w'],
  ['w','b','w','b','w','b','w','b'],
  ['b','w','b','w','b','w','b','w'],
  ['w','b','w','b','w','b','w','b'],
  ['b','w','b','w','b','w','b','w'],
  ['w','b','w','b','w','b','w','b'],
  ['b','w','b','w','b','w','b','w']
]

for(row in Board){
  for(square in Board[row]){
    if(Board[row][square] == 'w'){
      var square = document.createElement('div')
      square.className = 'white'
      console.log(square)
      square.style.gridArea = row
      document.getElementById('board').insertAdjacentElement("beforeend", square)
    }
    else{
      var square = document.createElement('div')
      square.className = 'black'
      square.style.gridArea = row
      console.log(square)
      
      document.getElementById('board').insertAdjacentElement("beforeend", square)
    }
  }
}