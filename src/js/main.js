import { ListItem } from "./class";

let theList = [];
theList.push(new ListItem("Köp en ny dator", false));
theList.push(new ListItem("Städa", false));

let newItemObject = "";

function addtolist() {
  let inTag = document.getElementById("additem");
  let newTask = inTag.value;
  newItemObject = new ListItem(newTask, false);
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
    listTag.appendChild(checkBox);
    listTag.appendChild(labelTag);

    checkBox.addEventListener("change", (e) => {
      completedTask(e, listTag, todoTag);
    });
    todoTag.appendChild(listTag);
  }
}

function completedTask(e, listTag, todoTag) {
  let completedTag = document.getElementById("completed");
  if (e.target.checked) {
    completedTag.appendChild(listTag);
  } else {
    todoTag.appendChild(listTag);
  }
}

function init() {
  innerTag();

  document.getElementById("btn-item").addEventListener("click", addtolist);
}

init();
