function showPage(pageId, el) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.style.display = 'none');

  document.getElementById(pageId).style.display = 'block';

  const menuItems = document.querySelectorAll('.sidebar li');
  menuItems.forEach(item => item.classList.remove('active'));

  if (el) {
    el.classList.add('active');
  }
}

function tambahTugas() {
  const select = document.getElementById("course");
  const value = select.value;
  const judul = document.getElementById("JudulTugas").value;

  if (value === "") {
    alert("Pilih mata kuliah dulu!");
    return;
  }

  if (judul === "") {
    alert("Masukkan nama tugas!");
    return;
  }

  const list = document.querySelector(".tugas-list");

const item = document.createElement("p");

item.innerHTML = `
  <span class="task-text">⏳ ${judul} - ${value}</span>
  <button onclick="selesaiTugas(this)">✔️</button>
  <button onclick="hapusTugas(this)">❌</button>
`;

  list.appendChild(item);

  select.value = "";
  document.getElementById("JudulTugas").value = "";
}

function selesaiTugas(btn) {
  const text = btn.parentElement.querySelector(".task-text");

  text.style.textDecoration = "line-through";
  text.style.color = "gray";
  text.textContent = text.textContent.replace("⏳", "✔️");
}

function hapusTugas(btn) {
  btn.parentElement.remove();
}