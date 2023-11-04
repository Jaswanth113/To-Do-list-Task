const taskInput = document.getElementById('task');
const taskDescriptionInput = document.getElementById('taskDescription');
const addButton = document.getElementById('addButton');
const pendingTasksList = document.getElementById('pending-tasks');
const completedTasksList = document.getElementById('completed-tasks');

addButton.addEventListener('click', addTask);

function addTask() {
    const taskTitle = taskInput.value;
    const taskDescription = taskDescriptionInput.value;

    if (taskTitle.trim() === '') {
        alert('Please enter a task title.');
        return;
    }

    const timestamp = new Date().toLocaleString();
    const taskElement = document.createElement('li');
    taskElement.classList.add('task-item');
    taskElement.innerHTML = `
        <h3>${taskTitle}</h3>
        <p>${taskDescription}</p>
        <div class="timestamp">Created: ${timestamp}</div>
        <div class="action-buttons">
            <button class="complete" onclick="completeTask(this)">Complete</button>
            <button class="edit" onclick="editTask(this)">Edit</button>
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    pendingTasksList.appendChild(taskElement);
    taskInput.value = '';
    taskDescriptionInput.value = '';
}

function editTask(button) {
    const li = button.parentElement.parentElement;
    const h3 = li.querySelector('h3');
    const p = li.querySelector('p');

    const newTitle = prompt('Edit task title:', h3.innerText);
    const newDescription = prompt('Edit task description:', p.innerText);

    if (newTitle !== null) {
        h3.innerText = newTitle;
        p.innerText = newDescription || '';
    }
}

function deleteTask(button) {
    const li = button.parentElement.parentElement;
    li.remove();
}

function completeTask(button) {
    const li = button.parentElement.parentElement;
    li.classList.toggle('completed');
    const timestamp = li.querySelector('.timestamp');

    if (li.classList.contains('completed')) {
        button.innerHTML = 'Undo';
        button.onclick = function () {
            undoTask(this);
        };
        completedTasksList.appendChild(li);
        const completedTimestamp = new Date().toLocaleString();
        timestamp.innerText += ` (Completed: ${completedTimestamp})`;
    } else {
        button.innerHTML = 'Complete';
        button.onclick = function () {
            completeTask(this);
        };
        pendingTasksList.appendChild(li);
        const completedTimestamp = timestamp.innerText.match(/\(Completed:.*\)/);
        timestamp.innerText = timestamp.innerText.replace(completedTimestamp, '');
    }
}

function undoTask(button) {
    const li = button.parentElement.parentElement;
    li.classList.toggle('completed');
    button.innerHTML = 'Complete';
    button.onclick = function () {
        completeTask(this);
    };
    pendingTasksList.appendChild(li);
    const completedTimestamp = li.querySelector('.timestamp').innerText.match(/\(Completed:.*\)/);
    li.querySelector('.timestamp').innerText = li.querySelector('.timestamp').innerText.replace(completedTimestamp, '');
}