const draggableList = document.getElementById("draggable-list");
const checkBtn = document.getElementById("check");

const vals = [];

const listItems = [];
let dragStartIndex;

// Function to create the draggable list with user input
function createList() {
    // Clear existing values
    alert("Enter 10 numbers");
    vals.length = 0;
    // Take user input for 10 values
    for (let i = 0; i < 10; i++) {
        const userInput = prompt(`Enter value ${i + 1}:`);
        if (userInput) {
            vals.push(parseFloat(userInput.trim())); // Parse as float to compare as numbers
        } else {
            // If user cancels or enters an empty value, ask again for the same index
            i--;
        }
    }

    // Sort the array numerically
    vals.sort((a, b) => a - b);

    // Create list items
    vals.forEach((number, index) => {
        const listItem = createListItem(number, index);
        listItems.push(listItem);
        draggableList.appendChild(listItem);
    });

    addEventListeners();
}

// Function to create a list item
function createListItem(number, index) {
    const listItem = document.createElement('li');
    listItem.setAttribute('data-index', index);
    listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${number}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
    `;
    return listItem;
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
    listItems.forEach((listItem, index) => {
        const number = listItem.querySelector('.draggable').innerText.trim();

        if (parseFloat(number) !== vals[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

function addEventListeners() {
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

// Call createList function to start the process
createList();

checkBtn.addEventListener("click", checkOrder);
