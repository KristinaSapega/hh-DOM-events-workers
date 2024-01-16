const creationZone = document.getElementById('creation-zone');
const leftZone = document.getElementById('left-zone');
const rightZone = document.getElementById('right-zone');
const emptyZone = document.getElementById('empty-zone');

creationZone.addEventListener('dragstart', dragStart);
creationZone.addEventListener('dragend', dragEnd);
leftZone.addEventListener('dragover', dragOver);
rightZone.addEventListener('dragover', dragOver);
leftZone.addEventListener('dragenter', dragEnter);
rightZone.addEventListener('dragenter', dragEnter);
leftZone.addEventListener('dragleave', dragLeave);
rightZone.addEventListener('dragleave', dragLeave);
leftZone.addEventListener('drop', dropLeftZone);
rightZone.addEventListener('drop', dropRightZone);


function dragStart(e) {
  e.dataTransfer.setData('text/plain', null);
}

function dragEnd() {
  creationZone.style.transform = 'translate(0, 0)';
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.style.border = '2px dashed black';
}

function dragLeave() {
  this.style.border = '1px solid #ccc';
}

function dropLeftZone(e) {
  const draggableElement = createDraggableElement();
      
  const offsetX = e.clientX - this.getBoundingClientRect().left;
  const offsetY = e.clientY - this.getBoundingClientRect().top;

  const gridSize = 100; 
  const snappedX = Math.floor(offsetX / gridSize) * gridSize;
  const snappedY = Math.floor(offsetY / gridSize) * gridSize;

  draggableElement.style.left = snappedX + 'px';
  draggableElement.style.top = snappedY + 'px';

  this.appendChild(draggableElement);
  this.style.border = '1px solid #ccc';
}

function dropRightZone(e) {
  const draggableElement = createDraggableElement();

  const offsetX = e.clientX - this.getBoundingClientRect().left;
  const offsetY = e.clientY - this.getBoundingClientRect().top;

  draggableElement.style.left = offsetX + 'px';
  draggableElement.style.top = offsetY + 'px';

  this.appendChild(draggableElement);
  this.style.border = '1px solid #ccc';
}

function createDraggableElement() {
  const draggableElement = document.createElement('div');
  draggableElement.classList.add('draggable');
  draggableElement.style.backgroundColor = getRandomColor();
  return draggableElement;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
