let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let editIndex = null;

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const warning = document.getElementById("warning");
const filterButtons = document.querySelectorAll(".filter");