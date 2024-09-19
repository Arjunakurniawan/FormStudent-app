const inputStudent1 = document.getElementById("input1");
const inputStudent2 = document.getElementById("input2");
const btnSubmit = document.getElementById("btnSubmit");
const btnCancel = document.getElementById("btnCancel");
const ul = document.getElementById("listStudents");
const title = document.getElementById("titleUl");

let states = {
  students: JSON.parse(localStorage.getItem("studentName")) || [],
  editIndex: null,
};

function saveToLocalStorage() {
  localStorage.setItem("studentName", JSON.stringify(states.students));
}

function createCheckbox(student, index) {
  const checkbox = document.createElement("input");
  checkbox.checked = student.isCompleted;
  checkbox.onclick = function (event) {
    states.students[index].isCompleted = event.target.checked;
    render();
    saveToLocalStorage();
  };
  checkbox.type = "checkbox";
  checkbox.id = "checkbox";

  return checkbox;
}

function createTextName(student) {
  const textName = document.createElement("p");
  textName.textContent = `name: ${student.name}`;
  textName.style.textDecoration = student.isCompleted ? "line-through" : "none";

  return textName;
}

function createTextJurusan(student) {
  const textJurusan = document.createElement("p");
  textJurusan.textContent = `jurusan: ${student.jurusan}`;
  textJurusan.style.textDecoration = student.isCompleted
    ? "line-through"
    : "none";

  textJurusan.className = textJurusan;
  return textJurusan;
}

function createButtonDelete(index) {
  const btnDelete = document.createElement("button");
  btnDelete.className = "button__delete";
  btnDelete.textContent = "Delete";

  btnDelete.onclick = function () {
    states.students.splice(index, 1);
    render();
    saveToLocalStorage();
  };

  return btnDelete;
}

function createButtonEdit(index) {
  const btnEdit = document.createElement("button");
  btnEdit.className = "button__edit";
  btnEdit.textContent = "Edit";

  btnEdit.onclick = function () {
    states.editIndex = index;
    render();
    saveToLocalStorage();
  };

  return btnEdit;
}

function renderStudentList() {
  ul.innerHTML = "";
  states.students.forEach((student, index) => {
    const checkbox = createCheckbox(student, index);
    const li = document.createElement("li");

    // styling css
    ul.style.display = "block";
    li.style.display = "flex";

    ul.prepend(title);
    li.append(checkbox);
    li.appendChild(createTextName(student));
    li.appendChild(createTextJurusan(student));
    li.appendChild(createButtonDelete(index));
    ul.appendChild(li);

    if (!student.isCompleted) {
      li.appendChild(createButtonEdit(index));
    }
  });
}

function EventOnClickButton() {
  if (states.editIndex !== null) {
    btnSubmit.textContent = "save";
    inputStudent1.focus();
    inputStudent2.focus();
    inputStudent1.value = states.students[states.editIndex].name;
    inputStudent2.value = states.students[states.editIndex].jurusan;
  } else {
    btnSubmit.textContent = "add";
    inputStudent1.value = "";
    inputStudent2.value = "";
  }

  btnSubmit.onclick = function (event) {
    event.preventDefault();
    if (states.editIndex === null) {
      if (inputStudent1.value === "" || inputStudent2.value === "") {
        alert("isi bidang ini!");
      } else {
        states.students.push({
          name: inputStudent1.value,
          jurusan: inputStudent2.value,
          isCompleted: false,
        });
        render();
        saveToLocalStorage();
      }
    } else {
      states.students[states.editIndex].name = inputStudent1.value;
      states.students[states.editIndex].jurusan = inputStudent2.value;
      states.editIndex = null;
      render();
      saveToLocalStorage();
    }
  };
}

function render() {
  renderStudentList();
  EventOnClickButton();
  EventButtonCancel();
}

function EventButtonCancel() {
  btnCancel.onclick = function () {
    inputStudent1.value = "";
    inputStudent2.value = "";
    btnSubmit.textContent = "Add";
    editIndex = null;
  };
}

render();
