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
}


function tambahTugas() {

  var judulTugas    = document.getElementById("JudulTugas").value;
  var matkulTugas   = document.getElementById("MataKuliah").value;
  var deadlineTugas = document.getElementById("deadlineInput").value;

  if (!judulTugas || !matkulTugas || !deadlineTugas) {
    alert("Isi semua data!");
    return;
  }

  var kotakDaftarTugas = document.querySelector(".tugas-list");

  var barisTugasBaru = document.createElement("p");

  barisTugasBaru.innerHTML = `
    <span class="task-text">⏳ ${judulTugas} - ${matkulTugas} (${deadlineTugas})</span>
    <div>
      <button onclick="selesaiTugas(this)">✔️</button>
      <button onclick="hapusTugas(this)">❌</button>
    </div>
  `;

  kotakDaftarTugas.appendChild(barisTugasBaru);

  document.getElementById("JudulTugas").value    = "";
  document.getElementById("MataKuliah").value    = "";
  document.getElementById("deadlineInput").value = "";

  perbaruiDashboard();
}


function selesaiTugas(tombolYangDiklik) {

  var teksTugas = tombolYangDiklik.parentElement.parentElement.querySelector(".task-text");

  teksTugas.style.textDecoration = "line-through";
  teksTugas.style.color = "gray";

  if (!teksTugas.textContent.includes("✔️")) {
    teksTugas.textContent = teksTugas.textContent.replace("⏳", "✔️");
  }

  perbaruiDashboard();
}


function hapusTugas(tombolYangDiklik) {

  tombolYangDiklik.parentElement.parentElement.remove();

  perbaruiDashboard();
}


function perbaruiDashboard() {

  var semuaTugas = document.querySelectorAll(".tugas-list p");

  var totalTugas    = semuaTugas.length;
  var tugasSelesai  = 0;
  var deadlineDekat = 0;

  var hariIni = new Date();

  semuaTugas.forEach(function(satTugas) {

    var teksnya = satTugas.querySelector(".task-text").textContent;

    if (teksnya.includes("✔️")) {
      tugasSelesai++;
    }

    var cocokkanTanggal = teksnya.match(/\d{4}-\d{2}-\d{2}/);

    if (cocokkanTanggal) {
      var tanggalDeadline = new Date(cocokkanTanggal[0]);

      var selisihHari = (tanggalDeadline - hariIni) / (1000 * 60 * 60 * 24);

      if (selisihHari <= 2 && selisihHari >= 0) {
        deadlineDekat++;
      }
    }
  });

  document.getElementById("total").textContent         = totalTugas;
  document.getElementById("selesai").textContent       = tugasSelesai;
  document.getElementById("belum").textContent         = totalTugas - tugasSelesai;
  document.getElementById("deadlineDekat").textContent = deadlineDekat;
}