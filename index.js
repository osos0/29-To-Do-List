const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));
list.forEach((task) => {
  toDoList(task);
});

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList();
});

function toDoList(task) {
  let newTask = inputEl.value;

  if (task) {
    newTask = task.name;
  }

  const liEl = document.createElement("li");

  if (task && task.checked) {
    liEl.classList.add("checked");
  }

  liEl.innerHTML = newTask;
  ulEl.appendChild(liEl);
  inputEl.value = ``;
  const checkerEl = document.createElement("div");
  checkerEl.innerHTML = `<i class="fa-solid fa-check-to-slot"></i>`;
  liEl.appendChild(checkerEl);
  const trashEl = document.createElement("div");
  trashEl.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  liEl.appendChild(trashEl);

  checkerEl.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updatelocalStorage();
  });

  trashEl.addEventListener("click", () => {
    liEl.remove();
    updatelocalStorage();
  });
  updatelocalStorage();
}

function updatelocalStorage() {
  const liEls = document.querySelectorAll("li");
  list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}
