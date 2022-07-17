// return square on mouse down and up

document.getElementById('board').addEventListener('mousedown', (event) => {
  console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`, event.target);
  document.getElementById('board').addEventListener('mouseup', (event) => {
    console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`, event.target);
  })
})













// render one checker, move if valid










