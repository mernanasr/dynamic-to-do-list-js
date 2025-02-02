document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    loadTasks();

    // Event listener for adding a task
    addButton.addEventListener('click', () => addTask(taskInput.value, true));
    
    // Allow adding tasks by pressing Enter
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value, true);
        }
    });

    // Function to add a new task
    function addTask(taskText, save = true) {
        taskText = taskText.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new task list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => {
            li.remove();
            removeTaskFromStorage(taskText);
        });

        // Append the remove button to the list item
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save task to Local Storage if needed
        if (save) {
            saveTaskToStorage(taskText);
        }

        // Clear input field
        taskInput.value = '';
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from Local Storage when the page loads
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(taskText => addTask(taskText, false));
    }
});
