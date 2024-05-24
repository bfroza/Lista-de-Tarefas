// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoDate = document.querySelector("#todo-date");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// Funções
const fetchTodos = async () => {
  const response = await fetch('http://localhost:8080/tasks');
  const todos = await response.json();
  return todos;
};

const createTodoElement = (text, date, done = false) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(deleteBtn);

  if (done) {
    todo.classList.add("done");
  }

  todoList.appendChild(todo);
};

const saveTodo = async (text, date, done = false) => {
  const currentDate = new Date();
  const savedTodo = await saveTodoToServer({ descricao: text, criacao: currentDate, limite: date, finalizada: done });
  createTodoElement(text, date, done);
  todoInput.value = "";
};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = async (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach(async (todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;

      // Update in the server
      await updateTodoOnServer(oldInputValue, text);
    }
  });
};

const getSearchedTodos = (search) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

    todo.style.display = "flex";

    if (!todoTitle.includes(search)) {
      todo.style.display = "none";
    }
  });
};

const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll(".todo");

  switch (filterValue) {
    case "all":
      todos.forEach((todo) => (todo.style.display = "flex"));
      break;

    case "done":
      todos.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;

    case "todo":
      todos.forEach((todo) =>
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;

    default:
      break;
  }
};

// Eventos
const buttonSUBT = document.getElementById("button_id");
buttonSUBT.addEventListener("click", async (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;
  const inputDate = todoDate.value;
  if (inputValue !== "" && inputDate !== "") {
    await saveTodo(inputValue, inputDate);
  }
});

document.addEventListener("click", async (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText || "";
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
    await toggleTodoStatusOnServer(todoTitle);
  }

  if (targetEl.classList.contains("remove-todo")) {
    parentEl.remove();
    await removeTodoFromServer(todoTitle);
  }

  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    await updateTodo(editInputValue);
  }

  toggleForms();
});

searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value;
  getSearchedTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
  searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;
  filterTodos(filterValue);
});

const saveTodoToServer = async (todo) => {
  const response = await fetch('http://localhost:8080/tasks/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });

  const savedTodo = await response.json();
  return savedTodo;
};

const removeTodoFromServer = async (todoText) => {
  const todos = await fetchTodos();
  const todo = todos.find(t => t.descricao === todoText);
  if (todo) {
    await fetch(`http://localhost:8080/tasks/${todo.id}`, {
      method: 'DELETE',
    });
  }
};

const toggleTodoStatusOnServer = async (todoText) => {
  const todos = await fetchTodos();
  const todo = todos.find(t => t.descricao === todoText);
  if (todo) {
    todo.finalizada = !todo.finalizada;
    await fetch(`http://localhost:8080/tasks/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
  }
};

const updateTodoOnServer = async (oldText, newText) => {
  const todos = await fetchTodos();
  const todo = todos.find(t => t.descricao === oldText);
  if (todo) {
    todo.descricao = newText;
    await fetch(`http://localhost:8080/tasks/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
  }
};

const loadTodos = async () => {
  const todos = await fetchTodos();
  todos.forEach(todo => {
    createTodoElement(todo.descricao, todo.limite, todo.finalizada);
  });
};

loadTodos();
