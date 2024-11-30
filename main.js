const BASE_URL = "https://3e215ea4824bb5f6.mokky.dev/Tudo-List";

const form = document.querySelector("form");
const input = document.querySelector("input");

const ul = document.getElementById("ul");

async function getTodos() {
  try {
    const response = await fetch(BASE_URL);

    const data = await response.json();

    renderTodos(data);
  } catch (error) {
    throw new Error(error);
  }
}

getTodos();

async function postTodos() {

  if (input.value.trim()===""){
   alert('пажалустаб введите текст задачи.')
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
    throw new Error(error);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  postTodos();
});

function renderTodos(todos) {
  ul.innerHTML = "";
  todos.map((element) => {
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "өчүрүү баскычы";

    deleteButton.addEventListener("click", () => deleteTodo(element.id));

    li.innerText = element.title;

    li.appendChild(deleteButton);

    ul.append(li);
  });
}

async function deleteTodo(todoId) {
  try {
    await fetch(`${BASE_URL}/${todoId}`, {
      method: "DELETE",
    });

    getTodos();
  } catch (error) {
    throw new Error(error);
  }
}