"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoClass = function () {
  function ToDoClass() {
    _classCallCheck(this, ToDoClass);

    debugger;
    this.tasks = JSON.parse(localStorage.getItem("TASKS"));
    if (!this.tasks) {
      this.tasks = [{ task: "Take cat to vet", isComplete: false }, { task: "Do homework", isComplete: false }, { task: "Get to work", isComplete: true }];
    }

    this.loadTasks();
    this.addEventListener();
  }

  // Loads all tasks into the HTML


  _createClass(ToDoClass, [{
    key: "loadTasks",
    value: function loadTasks() {
      var _this = this;

      var taskHtml = this.tasks.reduce(function (html, task, index) {
        return html += _this.generateTaskHtml(task, index);
      }, "");
      document.getElementById("taskList").innerHTML = taskHtml;
      localStorage.setItem("TASK", JSON.stringify(this.tasks));
    }

    // Generates the HTML, where the tasks will load

  }, {
    key: "generateTaskHtml",
    value: function generateTaskHtml(task, index) {
      return "\n        <li class=\"list-group-item checkbox\">\n            <div class=\"row\">\n                <div class=\"col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox\">\n                    <label>\n                        <input \n                            id=\"toggleTaskStatus\" type=\"checkbox\" \n                            onchange=\"toDo.toggleTaskStatus(" + index + ")\" value=\"\"\n                            class=\"\" " + (task.isComplete ? "checked" : "") + ">\n                    </label>\n                </div>\n                <div class=\"col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text\n                     " + (task.isComplete ? "complete" : "") + "\">\n                    " + task.task + "\n                </div>\n                <div class=\"col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area\">\n                    <a class=\"\" href=\"/\" onClick=\"toDo.deleteTask(event, " + index + ")\">\n                        <i id=\"deleteTask\" data-id=\"" + index + "\" \n                            class=\"delete-icon glyphicon glyphicon-trash\"></i>\n                    </a>\n                </div>\n            </div>\n        </li>\n      ";
    }

    // Toggle the status of the task

  }, {
    key: "toggleTaskStatus",
    value: function toggleTaskStatus(index) {
      this.tasks[index].isComplete = !this.tasks[index].isComplete;
      this.loadTasks();
    }

    // Delete task

  }, {
    key: "deleteTask",
    value: function deleteTask(event, taskIndex) {
      event.preventDefault();
      this.tasks.splice(taskIndex, 1);
      this.loadTasks();
    }

    // Add a task to the list

  }, {
    key: "addTaskClick",
    value: function addTaskClick() {
      var target = document.getElementById("addTask");
      this.addTask(target.value);
      target.value = "";
    }
  }, {
    key: "addTask",
    value: function addTask(task) {
      var newTask = {
        task: task,
        isComplete: false
      };
      var parentDiv = document.getElementById("addTask").parentElement;
      if (task === "") {
        parentDiv.classList.add("has-error");
      } else {
        parentDiv.classList.remove("hasError");
        this.tasks.push(newTask);
        this.loadTasks();
      }
    }

    // Keypress event listener to add task

  }, {
    key: "addEventListener",
    value: function addEventListener() {
      var _this2 = this;

      document.getElementById("addTask").addEventListener("keypress", function (enter) {
        if (event.keyCode === 13) {
          _this2.addTask(event.target.value);
          event.target.value = "";
        }
      });
    }
  }]);

  return ToDoClass;
}();

var toDo = void 0;
window.addEventListener("load", function () {
  toDo = new ToDoClass();
});
//# sourceMappingURL=scripts.js.map