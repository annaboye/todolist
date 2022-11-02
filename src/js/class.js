export class ListItem {
  constructor(title, checked) {
    this.title = title;
    this.checked = checked;
  }
}
if (e.target.checked) {
  theCompletedList.push(theTask);
  for (let i = 0; i < theCompletedList.length; i++) {
    console.log(theCompletedList);
    theList.splice(theTask, 1);
    let labelTag = document.createElement("label");
    let checkBox = document.createElement("input");
    let listTag = document.createElement("li");
    checkBox.classList.add("clickable");
    checkBox.type = "checkbox";
    labelTag.innerText = theCompletedList[i].title;
    listTag.appendChild(checkBox);
    listTag.appendChild(labelTag);
    completedTag.appendChild(listTag);
  }
}
