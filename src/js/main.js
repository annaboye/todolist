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
  innerTag();
  newTask = " ";
}

function innerTag() {
  let ulTag = document.getElementById("todolist");
  ulTag.innerHTML = "";
  for (let i = 0; i < theList.length; i++) {
    let labelTag = document.createElement("label");
    let checkBox = document.createElement("input");
    let listTag = document.createElement("li");
    checkBox.classList.add("clickable");
    checkBox.type = "checkbox";
    labelTag.innerText = theList[i].title;

    checkBox.addEventListener("click", () => {
      completedTask(theList[i]);
    });
    listTag.appendChild(checkBox);
    listTag.appendChild(labelTag);
    ulTag.appendChild(listTag);
  }
}

function completedTask(task) {
  console.log("du klickade på", task);
}

function init() {
  innerTag();

  document.getElementById("btn-item").addEventListener("click", addtolist);
}

init();
