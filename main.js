const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const modal = document.getElementById("modal");
const confirmDeleteButton = document.getElementById("confirm-delete");
const cancelDeleteButton = document.getElementById("cancel-delete");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let taskToDelete = null;

const addTodo = (taskValue) => {
  tasks.push({ value: taskValue, id: Date.now(), completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
};

const deleteTask = (id) => {
  tasks = tasks.filter((item) => item.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
};

const toggleTaskCompletion = (id) => {
  tasks = tasks.map((item) => {
    if (item.id === id) {
      return { ...item, completed: !item.completed };
    }
    return item;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
};

const showModal = (id) => {
  taskToDelete = id;
  modal.style.display = "flex";
};

const hideModal = () => {
  modal.style.display = "none";
  taskToDelete = null;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskValue = input.value.trim();
  if (taskValue) {
    addTodo(taskValue);
    input.value = "";
  }
});

const renderTasks = () => {
  todoList.innerHTML = "";
  tasks.forEach((item) => {
    const listItem = document.createElement("li");
    const taskSpan = document.createElement("span");
    const deleteButton = document.createElement("button");

    taskSpan.textContent = item.value;
    if (item.completed) {
      taskSpan.classList.add("completed");
    }

    deleteButton.textContent = "delete";
    deleteButton.addEventListener("click", () => showModal(item.id));

    taskSpan.addEventListener("click", () => toggleTaskCompletion(item.id));

    listItem.append(taskSpan, deleteButton);
    todoList.appendChild(listItem);
  });
};

confirmDeleteButton.addEventListener("click", () => {
  if (taskToDelete !== null) {
    deleteTask(taskToDelete);
    hideModal();
  }
});

cancelDeleteButton.addEventListener("click", () => {
  hideModal();
});

renderTasks();
