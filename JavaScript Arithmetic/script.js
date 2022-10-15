function tambah() {
  var x = document.getElementById("angka1").value;
  var y = document.getElementById("angka2").value;
  document.getElementById("hasil").innerHTML = Number(x) + Number(y)
}

function kurang() {
  var x = document.getElementById("angka1").value;
  var y = document.getElementById("angka2").value;
  document.getElementById("hasil").innerHTML = x - y
}

function kali() {
  var x = document.getElementById("angka1").value;
  var y = document.getElementById("angka2").value;
  document.getElementById("hasil").innerHTML = x * y
}

function bagi() {
  var x = document.getElementById("angka1").value;
  var y = document.getElementById("angka2").value;
  document.getElementById("hasil").innerHTML = x / y
}

function sb() {
  var x = document.getElementById("angka1").value;
  var y = document.getElementById("angka2").value;
  document.getElementById("hasil").innerHTML = x % y
}

function pangkat() {
  var x = document.getElementById("angka1").value;
  var y = document.getElementById("angka2").value;
  document.getElementById("hasil").innerHTML = x ** y
}

