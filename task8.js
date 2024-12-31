// script.js
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const clearAllBtn = document.getElementById("clear-all");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    const renderTasks = (filter = "all") => {
      taskList.innerHTML = "";
      const filteredTasks = tasks.filter(task => 
        filter === "all" ? true :
        filter === "completed" ? task.completed :
        !task.completed
      );
  
      filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.name;
        li.classList.toggle("completed", task.completed);
        li.addEventListener("click", () => toggleTask(task));
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteTask(task));
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    };
  
    const saveTasks = () => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    const addTask = () => {
      const taskName = taskInput.value.trim();
      if (taskName) {
        tasks.push({ name: taskName, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = "";
      }
    };
  
    const toggleTask = (task) => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };
  
    const deleteTask = (taskToDelete) => {
      tasks = tasks.filter(task => task !== taskToDelete);
      saveTasks();
      renderTasks();
    };
  
    const clearAllTasks = () => {
      tasks = [];
      saveTasks();
      renderTasks();
    };
  
    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") addTask();
    });
  
    clearAllBtn.addEventListener("click", clearAllTasks);
  
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        renderTasks(button.id.split("-")[1]);
      });
    });
  
    renderTasks();
  });
  