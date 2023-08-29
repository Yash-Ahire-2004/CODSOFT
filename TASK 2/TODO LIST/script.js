document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");
  
    addButton.addEventListener("click", addTask);
  
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
          <span class="task-text">${taskText}</span>
          <input type="text" class="edit-input" style="display: none;">
          <button class="edit-button">Edit</button>
          <span class="delete">Delete</span>
        `;
        taskList.appendChild(taskItem);
        taskInput.value = "";
        updateLocalStorage();
        attachEditEvent(taskItem);
        attachDeleteEvent(taskItem);
      }
    }
  
    function attachEditEvent(taskItem) {
      const editButton = taskItem.querySelector(".edit-button");
      const taskText = taskItem.querySelector(".task-text");
      const editInput = taskItem.querySelector(".edit-input");
  
      editButton.addEventListener("click", function () {
        editInput.style.display = "block";
        editInput.value = taskText.innerText;
        taskText.style.display = "none";
        editButton.style.display = "none";
      });
  
      editInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          taskText.innerText = editInput.value;
          editInput.style.display = "none";
          taskText.style.display = "inline";
          editButton.style.display = "inline";
          updateLocalStorage();
        }
      });
    }
  
    function attachDeleteEvent(taskItem) {
      const deleteButton = taskItem.querySelector(".delete");
      deleteButton.addEventListener("click", function () {
        taskList.removeChild(taskItem);
        updateLocalStorage();
      });
    }
  
    function updateLocalStorage() {
      const tasks = [];
      taskList.querySelectorAll("li").forEach((taskItem) => {
        tasks.push(taskItem.querySelector(".task-text").innerText);
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function loadTasksFromLocalStorage() {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks.forEach((taskText) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
          <span class="task-text">${taskText}</span>
          <input type="text" class="edit-input" style="display: none;">
          <button class="edit-button">Edit</button>
          <span class="delete">Delete</span>
        `;
        taskList.appendChild(taskItem);
        attachEditEvent(taskItem);
        attachDeleteEvent(taskItem);
      });
    }
  
    loadTasksFromLocalStorage();
  });
  