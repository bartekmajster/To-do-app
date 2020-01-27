class Task {
  static makeTask(task, done) {
    this.task = document.createElement("li");
    this.task.className = "task";
    this.task.innerHTML =
      task +
      `<div class = "buttons">
    <button class = "remove" >
    <i class = "far fa-trash-alt"></i></button>
    <button class = "complete">
    <i class = "${done} fa-check-circle"></i>
    </button>
    </div>`;
    return this.task;
  }
}

class List {
  constructor() {
    this.ul = document.getElementById("undone");
    //this.taskNumber = document.querySelector('h1 span');
    this.tasks = [];
  }
  updateList(tasks = this.tasks) {
    this.ul.textContent = "";
    tasks.forEach((task, i) => {
      task.dataset.index = i;
      this.ul.appendChild(task);
    });
  }
  addTask(task) {
    this.tasks.push(Task.makeTask(task, "far"));
    this.updateList();
    //this.taskNumber.textContent = this.tasks.length;
  }
  removeTask(task) {
    console.log(task);
    this.tasks.splice(task, 1);
    this.updateList();
    //this.taskNumber.textContent = this.tasks.length;
  }
}

class DoneList {
  constructor() {
    this.ul = document.getElementById("done");
    this.tasks = [];
  }
  updateList(tasks = this.tasks) {
    this.ul.textContent = "";
    tasks.forEach((task, i) => {
      task.dataset.index = i;
      this.ul.appendChild(task);
    });
  }
  addTask(task) {
    this.tasks.push(Task.makeTask(task, "fas"));
    this.updateList();
  }
  removeTask(task) {
    console.log(task);
    this.tasks.splice(task, 1);
    this.updateList();
  }
}

class App {
  constructor() {
    this.list = new List();
    this.donelist = new DoneList();

    this.input = document.querySelector("input");
    document.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();
      if (this.input.value) {
        this.list.addTask(this.input.value);
        this.input.value = "";
      }
    });

    this.list.updateList();

    this.list.ul.addEventListener("click", e => {
      if (event.target.parentNode.classList.contains("remove"))
        this.list.removeTask(
          event.target.parentNode.parentNode.parentNode.dataset.index
        );
      else if (event.target.parentNode.classList.contains("complete")) {
        event.target.classList.toggle("fas");
        event.target.classList.toggle("far");
        this.donelist.addTask(
          event.target.parentNode.parentNode.parentNode.textContent
        );
        this.list.removeTask(
          event.target.parentNode.parentNode.parentNode.dataset.index
        );
      }
    });
    this.donelist.ul.addEventListener("click", e => {
      if (event.target.parentNode.classList.contains("remove"))
        this.donelist.removeTask(
          event.target.parentNode.parentNode.parentNode.dataset.index
        );
      else if (event.target.parentNode.classList.contains("complete")) {
        event.target.classList.toggle("fas");
        event.target.classList.toggle("far");
        this.list.addTask(
          event.target.parentNode.parentNode.parentNode.textContent
        );
        console.log(
          event.target.parentNode.parentNode.parentNode.dataset.index
        );
        this.donelist.removeTask(
          event.target.parentNode.parentNode.parentNode.dataset.index
        );
      }
    });
  }
}

const app = new App();
