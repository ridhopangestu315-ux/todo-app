// DATA GLOBAL
var semuaDataTugas = JSON.parse(localStorage.getItem("tugas")) || [];


// NAVIGASI HALAMAN
// =======================
function showPage(halamanYangDituju, menuYangDiklik) {

  document.querySelectorAll('.page').forEach(function(halaman) {
    halaman.style.display = 'none';
  });

  document.getElementById(halamanYangDituju).style.display = 'block';

  document.querySelectorAll('.sidebar li').forEach(function(menu) {
    menu.classList.remove('active');
  });

  if (menuYangDiklik) {
    menuYangDiklik.classList.add('active');
  }

  if (halamanYangDituju === "kalender") {
    tampilkanKalender();
  }
}

// TAMBAH TUGAS
function tambahTugas() {

  var judulTugas    = document.getElementById("JudulTugas").value;
  var matkulTugas   = document.getElementById("MataKuliah").value;
  var deadlineTugas = document.getElementById("deadlineInput").value;

  if (!judulTugas || !matkulTugas || !deadlineTugas) {
    alert("Isi semua data!");
    return;
  }

  var data = {
    judul: judulTugas,
    matkul: matkulTugas,
    deadline: deadlineTugas,
    selesai: false
  };

  semuaDataTugas.push(data);
  simpanData();

  tampilkanTugas();
  perbaruiDashboard();
}

// TAMPILKAN TUGAS
function tampilkanTugas() {

  var kotak = document.querySelector(".tugas-list");
  kotak.innerHTML = "";

  semuaDataTugas.forEach(function(tugas, index) {

    var el = document.createElement("p");

    el.innerHTML = `
      <span style="${tugas.selesai ? 'text-decoration:line-through;color:gray;' : ''}">
        ${tugas.selesai ? "✔️" : "⏳"} 
        ${tugas.judul} - ${tugas.matkul} (${tugas.deadline})
      </span>
      <div>
        <button onclick="toggleSelesai(${index})">✔️</button>
        <button onclick="hapus(${index})">❌</button>
      </div>
    `;

    kotak.appendChild(el);
  });
}

// SELESAI / HAPUS
function toggleSelesai(index) {
  semuaDataTugas[index].selesai = !semuaDataTugas[index].selesai;
  simpanData();
  tampilkanTugas();
  perbaruiDashboard();
}

function hapus(index) {
  semuaDataTugas.splice(index, 1);
  simpanData();
  tampilkanTugas();
  perbaruiDashboard();
}

// KALENDER
function tampilkanKalender() {

  var kalender = document.getElementById("isiKalender");
  kalender.innerHTML = "";

  // urutkan berdasarkan tanggal
  var sorted = semuaDataTugas.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  sorted.forEach(function(tugas) {

    var el = document.createElement("p");

    el.innerHTML = `
      📌 <b>${tugas.deadline}</b> - ${tugas.judul} (${tugas.matkul})
    `;

    kalender.appendChild(el);
  });

  if (semuaDataTugas.length === 0) {
    kalender.innerHTML = "<p>Belum ada tugas</p>";
  }
}

// DASHBOARD
function perbaruiDashboard() {

  var total = semuaDataTugas.length;
  var selesai = semuaDataTugas.filter(t => t.selesai).length;
  var belum = total - selesai;

  var hariIni = new Date();
  var deadlineDekat = 0;

  semuaDataTugas.forEach(function(t) {
    var selisih = (new Date(t.deadline) - hariIni) / (1000 * 60 * 60 * 24);
    if (selisih <= 2 && selisih >= 0) {
      deadlineDekat++;
    }
  });

  document.getElementById("total").textContent = total;
  document.getElementById("selesai").textContent = selesai;
  document.getElementById("belum").textContent = belum;
  document.getElementById("deadlineDekat").textContent = deadlineDekat;
}

// LOCAL STORAGE
function simpanData() {
  localStorage.setItem("tugas", JSON.stringify(semuaDataTugas));
}

// INIT AWAL
tampilkanTugas();
perbaruiDashboard();