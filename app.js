const input = document.getElementById("todo-input");
const addBtn = document.getElementById("btn-add");
const list = document.getElementById("todo-list");
const totalCount = document.getElementById("total-tasks");
const doneCount = document.getElementById("completed-tasks");
const leftCount = document.getElementById("uncompleted-tasks");

let total = 0;
let done = 0;
let left = 0;

function updateStats() {
  totalCount.textContent = total;
  doneCount.textContent = done;
  leftCount.textContent = left;
}

function addTask() {
  const taskText = input.value.trim();

  if (!taskText) {
    alert("Tugas tidak boleh kosong, Ketik naon wae sok.");
    return;
  }

  const item = document.createElement("li");
  item.className = "task-item";
  item.innerHTML = `
    <input type="checkbox" class="task-check" />
    <span class="task-name">${taskText}</span>
    <div class="task-actions">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Hapus</button>
    </div>
  `;

  const checkbox = item.querySelector(".task-check");
  const taskName = item.querySelector(".task-name");
  const editBtn = item.querySelector(".edit-btn");
  const deleteBtn = item.querySelector(".delete-btn");

  checkbox.addEventListener("change", function () {
    item.classList.toggle("done");

    if (checkbox.checked) {
      done++;
      left--;
    } else {
      done--;
      left++;
    }

    updateStats();
  });

  editBtn.addEventListener("click", function () {
    const newText = prompt("Edit tugas:", taskName.textContent);

    if (newText !== null && newText.trim() !== "") {
      taskName.textContent = newText.trim();
    }
  });

  deleteBtn.addEventListener("click", function () {
    const isDone = item.classList.contains("done");

    item.remove();
    total--;

    if (isDone) {
      done--;
    } else {
      left--;
    }

    updateStats();
  });

  list.appendChild(item);
  input.value = "";

  total++;
  left++;
  updateStats();
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});