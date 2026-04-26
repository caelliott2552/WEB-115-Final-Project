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
});

// Render tasks into the taskManager using innerHTML
function renderTasks() {
  let html = '';

  tasks.forEach(task => {
    const importantClass = task.isImportant ? 'task-important' : '';
    const completedClass = task.isCompleted ? 'task-completed' : '';

    html += `
      <div class="task-card ${importantClass} ${completedClass}">
        <div class="task-header">
          <span>${escapeHtml(task.name)}</span>
          <span>Priority: ${task.priority}</span>
        </div>
        <div class="task-meta">
          Added: ${task.date}
        </div>
        <div class="task-actions">
          <button onclick="toggleCompleted(${task.id})">
            ${task.isCompleted ? 'Undo' : 'Done'}
          </button>
          <button onclick="deleteTask(${task.id})">
            Delete
          </button>
          <label>
            <input type="checkbox" onchange="toggleCompleted(${task.id})" ${task.isCompleted ? 'checked' : ''}>
            Completed
          </label>
          ${task.isImportant ? '<span style="color:red;font-size:0.8rem;">Important</span>' : ''}
        </div>
      </div>
    `;
  })

  taskManagerDiv.innerHTML = html;
}

// Toggle completion status
function toggleCompleted(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.isCompleted = !task.isCompleted;
    logTasks();
    renderTasks();
  }
}

// Delete a task
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  logTasks();
  renderTasks();
}

// Log tasks to console using JSON.stringify
function logTasks() {
  console.log(JSON.stringify(tasks));
}

// Simple HTML escaping for safety
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}