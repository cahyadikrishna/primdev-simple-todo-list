const key = "SIMPLE_TODO_LIST";
const input = document.getElementById("inputField");
const activityContainer = document.getElementById("listActivity");

function accesStorage(action, todoData = null) {
  if (action === "GET") {
    return JSON.parse(localStorage.getItem(key));
  } else if (action === "SET" && todoData !== null) {
    localStorage.setItem(key, JSON.stringify(todoData));
  }
}

function addData() {
  const todo = accesStorage("GET");

  todo.push({ id: Date.now() + Math.random(), todo: input.value });
  accesStorage("SET", todo);

  input.value = "";
  getData();
}

function getData() {
  activityContainer.innerHTML = "";

  const todo = accesStorage("GET");

  todo.forEach((data, index) => {
    activityContainer.innerHTML += `
      <div class="activity">
      <p>${index + 1}. ${data.todo}</p>
      <button class="del-btn" onclick="removeData(${data.id})">X</button>
    </div>`;
  });
}

function removeData() {
  console.log("remove data");
}

//get data ketika load
getData();

//ketika storage isi dari storage kosong atau null, maka berikan dia "Array kosong" atau []
if (accesStorage("GET") === null) accesStorage("SET", []);
