const creationZone = document.getElementById('creation-zone');
const leftZone = document.getElementById('left-zone');
const rightZone = document.getElementById('right-zone');
const emptyZone = document.getElementById('empty-zone');
let currentDraggableElemShift = null //используем для отслеживания текущих координат перетаскиваемого элемента
let currentDraggableElem = null

function createDraggableElem() {
    const elem = document.createElement('div');
    elem.classList.add('square', 'draggble');
    elem.style.background = getRandomColor();
    elem.style.top = '50px';
    elem.style.left = '50px';
    creationZone.appendChild(elem);
    elem.addEventListener('pointerdown', (event) => pointerDown(event, elem));
    return elem;
}
createDraggableElem();

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getOverZone(x, y) {
    const zones = [
        { id: 'left', elem: leftZone },
        { id: 'right', elem: rightZone }
    ]

    for (const zone of zones) {
        // Получаем прямоугольник текущей зоны
        const rect = zone.elem.getBoundingClientRect();
        // Проверяем, находятся ли координаты (x, y) внутри текущей зоны
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            return zone.id;
        }
    }
    return undefined;
}

function dropItem(event) {
    const elem = event.currentTarget
    const zone = getOverZone(event.clientX, event.clientY)
    // Если элемент опущен мимо всех зон, удаляем его
    if (!zone) {
        currentDraggableElem.remove();
    }
    else if (zone === 'left') {
        leftZone.appendChild(elem)
        Object.assign(elem.style, {
            position: 'relative',
            top: '0px',
            left: '0px'
        })
    }
    else if (zone === 'right') {
        rightZone.appendChild(elem)
        const shiftX = Math.random() * (rightZone.offsetWidth - elem.offsetWidth);
        const shiftY = Math.random() * (rightZone.offsetHeight - elem.offsetHeight);
        Object.assign(elem.style, {
            top: `${shiftY}px`,
            left: `${shiftX}px`
        })
    }
    createDraggableElem()
    event.currentTarget.removeEventListener('pointermove', moveItem)
    event.currentTarget.removeEventListener('pointerup', dropItem)
}

function moveItem(event) {
    const currentDraggableElem = event.currentTarget;
    // let currentDraggableElemPos = { x: event.clientX, y: event.clientY };

    currentDraggableElem.style.top = event.clientY - currentDraggableElemShift.y + 'px';
    currentDraggableElem.style.left = event.clientX - currentDraggableElemShift.x + 'px';
}

function pointerDown(event, elem) {
    event.preventDefault();
    const { top, left } = elem.getBoundingClientRect()
    elem.setPointerCapture(event.pointerId); //захват указателя
    currentDraggableElemShift = { x: event.clientX - left, y: event.clientY - top } //текущие координаты указателя в объект
    currentDraggableElem = elem;
    elem.addEventListener('pointermove', moveItem);
    elem.addEventListener('pointerup', dropItem);
}



