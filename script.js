let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let editIndex = null;

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const warning = document.getElementById("warning");
const filterButtons = document.querySelectorAll(".filter");
const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const saveEdit = document.getElementById("saveEdit");
const cancelEdit = document.getElementById("cancelEdit");
const deleteModal = document.getElementById("deleteModal");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");
const deleteDone = document.getElementById("deleteDone");
const deleteAll = document.getElementById("deleteAll");
const confirmAllModal = document.getElementById("confirmAllModal");
const confirmDoneModal = document.getElementById("confirmDoneModal");

function renderTasks() {
    taskList.innerHTML = "";
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "all") return true;
    if (currentFilter === "done") return task.done;
    if (currentFilter === "todo") return !task.done;
  });
  if (filteredTasks.length === 0) {
    const emptyMsg = document.createElement("div");
    emptyMsg.className = "empty-message";
    emptyMsg.innerText = "No tasks.";
    taskList.appendChild(emptyMsg);
  }else {
    filteredTasks.forEach((task, index) => {
      const taskItem = document.createElement("div");
      taskItem.className = "task-item";
      const taskText = document.createElement("div");
      taskText.className = "task-text" + (task.done ? " done" : "");
      taskText.innerText = task.text;
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.className = "task-checkbox";
      checkbox.addEventListener("change", () => {
        task.done = !task.done;
        saveTasks();
        renderTasks();
      });





}
