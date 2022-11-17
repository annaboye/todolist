import { ListItem } from "./models/class";

let theList = [];

function addtolist() {
  let inTag = document.getElementById("additem");
  let newTask = inTag.value;
  if (inTag.value === "") {
    alert("du måste skriva något");
  } else {
    let newItemObject = new ListItem(newTask, false);
    theList.push(newItemObject);
    inTag.value = "";

    addTodoTag();
  }
}

function addTodoTag() {
  localStorage.setItem("todolist", JSON.stringify(theList));
  let todoTag = document.getElementById("todolist");
  let completedTag = document.getElementById("completed");
  todoTag.innerHTML = "";
  completedTag.innerHTML = "";
  for (let i = 0; i < theList.length; i++) {
    let labelTag = document.createElement("label");
    let checkBox = document.createElement("input");
    let listTag = document.createElement("li");
    let deletebtn = document.createElement("i");
    checkBox.type = "checkbox";
    labelTag.innerText = theList[i].title;
    listTag.className = "tasktodo";
    listTag.appendChild(checkBox);
    listTag.appendChild(labelTag);
    listTag.appendChild(deletebtn);
    deletebtn.classList.add("bi", "bi-x");
    deletebtn.addEventListener("click", () => {
      removeFromList(theList[i]);
    });

    checkBox.addEventListener("click", () => {
      toggleTodo(theList[i]);
    });
    if (theList[i].done == false) {
      todoTag.appendChild(listTag);
    }
    if (theList[i].done == true) {
      checkBox.checked = true;
      completedTag.appendChild(listTag);
    }
  }
}

function toggleTodo(todo) {
  todo.done = !todo.done;
  addTodoTag();
}

function removeFromList(todo) {
  let mylistindex = theList.indexOf(todo);
  theList.splice(mylistindex, 1);
  addTodoTag();
}

function getListsFromLS() {
  console.log("Getting data");
  let listFromLS = JSON.parse(localStorage.getItem("todolist"));
  for (let i = 0; i < listFromLS.length; i++) {
    theList.push(new ListItem(listFromLS[i].title, listFromLS[i].done));
  }
  addTodoTag();

  console.log(theList);
}

function sortTheList() {
  theList.sort((a, b) => {
    let fa = a.title.toLowerCase(),
      fb = b.title.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

  addTodoTag();
}

function init() {
  document.getElementById("btn-item").addEventListener("click", addtolist);
  document.getElementById("btn-sort").addEventListener("click", sortTheList);

  if (localStorage.length > 0) {
    getListsFromLS();
  } else {
    theList.push(new ListItem("Köp en ny dator", false));
    theList.push(new ListItem("Städa", false));
  }
  addTodoTag();
}

init();
