const draggableList = document.getElementById("draggable-list");
const checkBtn = document.getElementById("check");
const richPersonInput = document.getElementById("richPersonInput");

let richestPeople = [];
const listItems = [];
let dragStartIndex;

createList();

function createList() {
    // Sort the array alphabetically
    richestPeople = richestPeople.sort((a, b) => a.localeCompare(b));

    richestPeople.forEach((person, index) => {
        const listItem = createListItem(person, index);
        listItems.push(listItem);
        draggableList.appendChild(listItem);
    });

    addEventListener();
}

function createListItem(person, index) {
    const listItem = document.createElement('li');
    listItem.setAttribute('data-index', index);
    listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
    `;
    return listItem;
}

function addRichPerson() {
    const newPerson = richPersonInput.value.trim();
    if (newPerson !== "") {
        richestPeople.push(newPerson);
        const newIndex = richestPeople.length - 1;
        const newListItem = createListItem(newPerson, newIndex);
        listItems.push(newListItem);
        draggableList.appendChild(newListItem);
        richPersonInput.value = ""; // Clear the input field
    }
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
    let correctOrder = true;

    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if (personName !== richestPeople[index]) {
            correctOrder = false;
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });

    if (correctOrder) {
        alert("Congratulations! The order is correct.");
    } else {
        alert("The order is incorrect. Please try again.");
    }
}

function addEventListener() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

checkBtn.addEventListener("click", checkOrder);