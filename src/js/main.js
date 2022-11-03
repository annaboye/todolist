import { ListItem } from "./models/class";

let theList = [];

let theCompletedList = [];

function addtolist() {
  let inTag = document.getElementById("additem");
  let newTask = inTag.value;
  let newItemObject = new ListItem(newTask);
  theList.push(newItemObject);
  inTag.value = "";

  innerTag();
}

function innerTag() {
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

  innerTag();
}
function unCompletedTask(listTask) {
  let mylistindex = theCompletedList.indexOf(listTask);
  theCompletedList.splice(mylistindex, 1);
  theList.push(listTask);
  innerTagCompleted();
  innerTag();
}

function getListsFromLS() {
  let listFromLS = JSON.parse(localStorage.getItem("todolist"));
  for (let i = 0; i < listFromLS.length; i++) {
    theList.push(new ListItem(listFromLS[i].title));
  }
  innerTag();

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

function init() {
  document.getElementById("btn-item").addEventListener("click", addtolist);

  if (localStorage.length > 0) {
    getCompletedListFromLS();
    getListsFromLS();
  } else {
    theList.push(new ListItem("Köp en ny dator"));
    theList.push(new ListItem("Städa"));
  }
  innerTag();
  innerTagCompleted();
}

init();
