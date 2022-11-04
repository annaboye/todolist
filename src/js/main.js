import { ListItem } from "./models/class";

let theList = [];

let theCompletedList = [];

function addtolist() {
  let inTag = document.getElementById("additem");
  let newTask = inTag.value;
  if (inTag.value === "") {
    alert("du måste skriva något");
  } else {
    let newItemObject = new ListItem(newTask);
    theList.push(newItemObject);
    inTag.value = "";

    addTodoTag();
  }
}

function addTodoTag() {
  let todoTag = document.getElementById("todolist");
  todoTag.innerHTML = "";
  for (let i = 0; i < theList.length; i++) {
    let labelTag = document.createElement("label");
    let checkBox = document.createElement("input");
    let listTag = document.createElement("li");
    checkBox.type = "checkbox";
    labelTag.innerText = theList[i].title;
    listTag.className = "tasktodo";
    listTag.appendChild(checkBox);
    listTag.appendChild(labelTag);

    checkBox.addEventListener("click", () => {
      completedTask(theList[i]);
    });
    todoTag.appendChild(listTag);
  }
  localStorage.setItem("todolist", JSON.stringify(theList));
}

function innerTagCompleted() {
  let completedTag = document.getElementById("completed");
  completedTag.innerHTML = "";
  for (let i = 0; i < theCompletedList.length; i++) {
    let labelTag = document.createElement("label");
    let checkBox = document.createElement("input");
    let listTag = document.createElement("li");
    checkBox.type = "checkbox";
    checkBox.checked = true;
    labelTag.innerText = theCompletedList[i].title;
    checkBox.addEventListener("click", () => {
      unCompletedTask(theCompletedList[i]);
    });
    listTag.className = "completedtask";
    listTag.appendChild(checkBox);
    listTag.appendChild(labelTag);
    completedTag.appendChild(listTag);
  }
  localStorage.setItem("completelist", JSON.stringify(theCompletedList));
}

function completedTask(listTask) {
  let mylistindex = theList.indexOf(listTask);
  theList.splice(mylistindex, 1);
  theCompletedList.push(listTask);

  innerTagCompleted();

  addTodoTag();
}
function unCompletedTask(listTask) {
  let mylistindex = theCompletedList.indexOf(listTask);
  theCompletedList.splice(mylistindex, 1);
  theList.push(listTask);
  innerTagCompleted();
  addTodoTag();
}

function getListsFromLS() {
  let listFromLS = JSON.parse(localStorage.getItem("todolist"));
  for (let i = 0; i < listFromLS.length; i++) {
    theList.push(new ListItem(listFromLS[i].title));
  }
  addTodoTag();

  console.log(theList);
}

function getCompletedListFromLS() {
  let completedFromLS = JSON.parse(localStorage.getItem("completelist"));
  for (let i = 0; i < completedFromLS.length; i++) {
    theCompletedList.push(new ListItem(completedFromLS[i].title));
  }
  innerTagCompleted();

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
    getCompletedListFromLS();
    getListsFromLS();
  } else {
    theList.push(new ListItem("Köp en ny dator"));
    theList.push(new ListItem("Städa"));
  }
  addTodoTag();
  innerTagCompleted();
}

init();
