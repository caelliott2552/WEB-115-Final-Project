// Array to store task objects
let tasks = [];
let nextId = 1;

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskNameInput = document.getElementById('taskName');
const prioritySelect = document.getElementById('priority');
const importantCheckbox = document.getElementById('important');
const taskManagerDiv = document.getElementById('taskmanager');

// Handle form submission
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = taskNameInput.value.trim();
    const priority = prioritySelect.value;
    const isImportant = importantCheckbox.checked;

    // Prevent invalid input (empty task name)
    if (name === '') {
        alert('Please enter a task name.');
        return;
    }

    const today = new Date();
    const dateString = today.toLocaleDateString();

    const newTask = {
        id: nextId++,
        name: name,
        priority: priority,
        isImportant: isImportant,
        isCompleted: false,
        date: dateString
    };

    tasks.push(newTask);
    logTasks();
    renderTasks();

    // Reset form
    taskNameInput.value = '';
    prioritySelect.value = 'Medium';
    importantCheckbox.checked = false;
})