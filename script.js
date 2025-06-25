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
    } else {
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
    const actions = document.createElement("div");
      actions.className = "task-actions";
      const editIcon = document.createElement("i");
      editIcon.className = "fas fa-edit";
      editIcon.addEventListener("click", () => {
        editIndex = index;
        editInput.value = task.text;
        editModal.style.display = "flex";
      });
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "fas fa-trash";
      deleteIcon.addEventListener("click", () => {
        editIndex = index;
        deleteModal.style.display = "flex";
      });
      actions.appendChild(checkbox);
      actions.appendChild(editIcon);
      actions.appendChild(deleteIcon);
      taskItem.appendChild(taskText);
      taskItem.appendChild(actions);
      taskList.appendChild(taskItem);
    });
    }
    taskList.style.maxHeight = tasks.length > 6 ? '400px' : 'auto';
    taskList.style.overflowY = tasks.length > 6 ? 'auto' : 'hidden';
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});
taskInput.addEventListener("input", () => {
  const value = taskInput.value.trim();
  if (/^\d/.test(value)) {
    warning.innerText = "Task cannot start with a number";
    warning.style.display = "block";
  } else if (value.length > 0 && value.length < 5) {
    warning.innerText = "Task must be at least 5 characters long";
    warning.style.display = "block";
  } else {
    warning.style.display = "none";
  }
});
function addTask() {
  const value = taskInput.value.trim();
  if (/^\d/.test(value) || value.length < 5) {
    return;
  }
  tasks.push({ text: value, done: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.getAttribute("data-filter");
    renderTasks();
  });
});
saveEdit.addEventListener("click", () => {
  const value = editInput.value.trim();
  if (value.length >= 5 && editIndex !== null) {
    tasks[editIndex].text = value;
    saveTasks();
    renderTasks();
    editModal.style.display = "none";
  }
});
cancelEdit.addEventListener("click", () => {
  editModal.style.display = "none";
});
confirmDelete.addEventListener("click", () => {
  if (editIndex !== null) {
    tasks.splice(editIndex, 1);
    saveTasks();
    renderTasks();
    deleteModal.style.display = "none";
  }
});
cancelDelete.addEventListener("click", () => {
  deleteModal.style.display = "none";
});
deleteDone.addEventListener("click", () => {
  confirmDoneModal.style.display = "flex";
});
deleteAll.addEventListener("click", () => {
  confirmAllModal.style.display = "flex";
});
document.getElementById("confirmDeleteAll").addEventListener("click", () => {
  tasks = [];
  saveTasks();
  renderTasks();
  confirmAllModal.style.display = "none";
});
document.getElementById("cancelDeleteAll").addEventListener("click", () => {
  confirmAllModal.style.display = "none";
});
document.getElementById("confirmDeleteDone").addEventListener("click", () => {
  tasks = tasks.filter(task => !task.done);
  saveTasks();
  renderTasks();
  confirmDoneModal.style.display = "none";
});
document.getElementById("cancelDeleteDone").addEventListener("click", () => {
  confirmDoneModal.style.display = "none";
});
window.addEventListener("click", e => {
  if (e.target === editModal) editModal.style.display = "none";
  if (e.target === deleteModal) deleteModal.style.display = "none";
  if (e.target === confirmAllModal) confirmAllModal.style.display = "none";
  if (e.target === confirmDoneModal) confirmDoneModal.style.display = "none";
});

renderTasks();