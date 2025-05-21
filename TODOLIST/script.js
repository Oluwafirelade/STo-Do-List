document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    function addTask() {
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        const li = document.createElement("li");
        li.draggable = true;

        li.innerHTML = `
            <span class="text">${taskText}</span>
            <button class="delete-button">Delete</button>
            <button class="move-button up-button">UP</button>
            <button class="move-button down-button">DOWN</button>
        `;

        li.querySelector(".delete-button").addEventListener("click", () => deleteTask(li));
        li.querySelector(".up-button").addEventListener("click", () => moveTaskUp(li));
        li.querySelector(".down-button").addEventListener("click", () => moveTaskDown(li));

        li.addEventListener("dragstart", handleDragStart);
        li.addEventListener("dragover", handleDragOver);
        li.addEventListener("drop", handleDrop);
        li.addEventListener("dragend", handleDragEnd);

        taskList.appendChild(li);
        taskInput.value = "";
    }

    function deleteTask(task) {
        task.remove();
    }

    function moveTaskUp(task) {
        const prev = task.previousElementSibling;
        if (prev) taskList.insertBefore(task, prev);
    }

    function moveTaskDown(task) {
        const next = task.nextElementSibling;
        if (next) taskList.insertBefore(next, task);
    }
    

    let draggingTask = null;

    function handleDragStart(event) {
        draggingTask = this;
        event.dataTransfer.effectAllowed = "move";
    }

    function handleDragOver(event) {
        event.preventDefault();
        const target = this;
        if (target !== draggingTask) {
            const rect = target.getBoundingClientRect();
            const next = (event.clientY - rect.top) > rect.height / 2;
            taskList.insertBefore(draggingTask, next ? target.nextSibling : target);
        }
    }

    function handleDrop() {
        draggingTask = null;
    }

    function handleDragEnd() {
        draggingTask = null;
    }

    document.querySelector(".add-button").addEventListener("click", addTask);
});
