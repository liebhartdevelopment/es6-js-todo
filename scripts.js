class ToDoClass {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("TASKS"));
    if (!this.tasks) {
      this.tasks = [
        { task: "Take cat to vet", isComplete: false },
        { task: "Do homework", isComplete: false },
        { task: "Get to work", isComplete: true }
      ];
    }

    this.loadTasks();
    this.addEventListener();
  }

  // Loads all tasks into the HTML
  loadTasks() {
    let taskHtml = this.tasks.reduce(
      (html, task, index) => (html += this.generateTaskHtml(task, index)),
      ""
    );
    document.getElementById("taskList").innerHTML = taskHtml;
    localStorage.setItem("TASK", JSON.stringify(this.tasks));
  }

  // Generates the HTML, where the tasks will load
  generateTaskHtml(task, index) {
    return `
        <li class="list-group-item checkbox">
            <div class="row">
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                    <label>
                        <input 
                            id="toggleTaskStatus" type="checkbox" 
                            onchange="toDo.toggleTaskStatus(${index})" value=""
                            class="" ${task.isComplete ? "checked" : ""}>
                    </label>
                </div>
                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text
                     ${task.isComplete ? "complete" : ""}">
                    ${task.task}
                </div>
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
                    <a class="" href="/" onClick="toDo.deleteTask(event, ${index})">
                        <i id="deleteTask" data-id="${index}" 
                            class="delete-icon glyphicon glyphicon-trash"></i>
                    </a>
                </div>
            </div>
        </li>
      `;
  }

  // Toggle the status of the task
  toggleTaskStatus(index) {
    this.tasks[index].isComplete = !this.tasks[index].isComplete;
    this.loadTasks();
  }

  // Delete task
  deleteTask(event, taskIndex) {
    event.preventDefault();
    this.tasks.splice(taskIndex, 1);
    this.loadTasks();
  }

  // Add a task to the list
  addTaskClick() {
    let target = document.getElementById("addTask");
    this.addTask(target.value);
    target.value = "";
  }
  addTask(task) {
    let newTask = {
      task,
      isComplete: false
    };
    let parentDiv = document.getElementById("addTask").parentElement;
    if (task === "") {
      parentDiv.classList.add("has-error");
    } else {
      parentDiv.classList.remove("hasError");
      this.tasks.push(newTask);
      this.loadTasks();
    }
  }

  // Keypress event listener to add task
  addEventListener() {
    document.getElementById("addTask").addEventListener("keypress", enter => {
      if (event.keyCode === 13) {
        this.addTask(event.target.value);
        event.target.value = "";
      }
    });
  }
}

let toDo;
window.addEventListener("load", () => {
  toDo = new ToDoClass();
});
