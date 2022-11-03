import { ListItem } from "./models/class";

let theList = [];

theList.push(new ListItem("Köp en ny dator", false));
theList.push(new ListItem("Städa", false));

let theCompletedList = [];

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

function addtolist() {
  let inTag = document.getElementById("additem");
  let newTask = inTag.value;
  let newItemObject = new ListItem(newTask, false);
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
}

function init() {
  innerTag();

  document.getElementById("btn-item").addEventListener("click", addtolist);
}

init();
