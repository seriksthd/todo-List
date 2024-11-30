const BASE_URL = "https://3e215ea4824bb5f6.mokky.dev/Tudo-List";

const form = document.querySelector("form");
const input = document.querySelector("input");

const ul = document.getElementById("ul");

const confirmModal = document.getElementById("confirmModal");
const confirmYesButton = document.getElementById("confirmYes");
const confirmNoButton = document.getElementById("confirmNo");

let currentTodoId = null; 

async function getTodos() {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    renderTodos(data);
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
  }
}

getTodos();

async function postTodos() {
  if (input.value.trim() === "") {
    alert("Пожалуйста, введите текст задачи.");
    return;
  }

  const todo = {
    title: input.value,
    id: Date.now(),
  };

  try {
    await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    input.value = "";
    getTodos();
  } catch (error) {
    console.error("Ошибка при добавлении задачи:", error);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  postTodos();
});

function renderTodos(todos) {
  ul.innerHTML = "";
  todos.forEach((element) => {
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "өчүрүү баскычы";

    deleteButton.addEventListener("click", () => {
      currentTodoId = element.id; 
      confirmModal.style.display = "flex"; 
    });

    li.innerText = element.title;
    li.appendChild(deleteButton);
    ul.append(li);
  });
}


confirmYesButton.addEventListener("click", async () => {
  try {
    await fetch(`${BASE_URL}/${currentTodoId}`, {
      method: "DELETE",
    });
    getTodos(); 
    confirmModal.style.display = "none"; 
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
  }
});


confirmNoButton.addEventListener("click", () => {
  confirmModal.style.display = "none"; 
});