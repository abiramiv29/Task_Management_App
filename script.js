document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    let taskName = document.getElementById("taskName").value.trim();
    let taskDescription = document.getElementById("taskDescription").value.trim(); 

    if (!taskName) {
        alert("Task name cannot be empty!");
        return;
    }
    if (!taskDescription) {
        alert("Task description cannot be empty!");
        return;
    }

    let task = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        status: "pending"
    };
    tasks.push(task);
    saveTasks();

    document.getElementById("taskName").value = "";
    document.getElementById("taskDescription").value = "";
}

function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        let li = document.createElement("li");
        if (task.status === "completed") {
            li.classList.add("completed");
        }
        li.innerHTML = `
            <span><strong>${task.name}</strong></span>
            <p>${task.description}</p> 
            <div>
                <button class="toggle" onclick="toggleStatus(${task.id})">
                    ${task.status === "completed" ? "Undo" : "Complete"}
                </button>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function editTask(id) {
    let task = tasks.find(t => t.id === id);
    if (!task) return;
    let newName = prompt("Edit Task Name:", task.name);
    let newDescription = prompt("Edit Task Description:", task.description); 
    if (newName !== null && newName.trim() !== "") task.name = newName.trim();
    if (newDescription !== null && newDescription.trim() !== "") task.description = newDescription.trim();
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function displayAllTasks() {
    renderTasks(); 
}

function displayCompletedTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.filter(task => task.status === "completed").forEach(task => {
        let li = document.createElement("li");
        li.classList.add("completed");
        li.innerHTML = `
            <span><strong>${task.name}</strong></span>
            <p>${task.description}</p> 
            <div>
                <button class="toggle" onclick="toggleStatus(${task.id})">Undo</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function displayPendingTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.filter(task => task.status === "pending").forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span><strong>${task.name}</strong></span>
            <p>${task.description}</p> 
            <div>
                <button class="toggle" onclick="toggleStatus(${task.id})">Complete</button>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleStatus(id) {
    let task = tasks.find(t => t.id === id);
    if (!task) return;
    task.status = task.status === "pending" ? "completed" : "pending";
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}
