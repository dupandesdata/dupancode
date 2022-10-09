let selectInput = document.getElementById("mySelect").value;

function myCek() {
  var jumlah = document.getElementById("obat").value; 
  var uang = document.getElementById("uangP").value;  

  if (jumlah == "") {
    var sukses = document.getElementById("pasanSukses").innerHTML = ""
    var error = document.getElementById("error").innerHTML = "Mohon isi jumlah obat"
  }
  else if (uang == "") {
    var sukses = document.getElementById("pasanSukses").innerHTML = ""
    var error = document.getElementById("error").innerHTML = "Mohon isi uang yang kamu miliki"
  }
  else if (jumlah <= 2) {
    diskon(10)
    var sukses = document.getElementById("pasanSukses").innerHTML = "selamat kamu dapat diskon 10%"
  }
  else if (jumlah <= 6) {
    diskon(20)
    var sukses = document.getElementById("pasanSukses").innerHTML = "selama kamu dapat diskon 20%"
  }
  else if (jumlah >= 7) {
    diskon(25)
    var sukses = document.getElementById("pasanSukses").innerHTML = "selamat kamu dapat diskon 25% "
  }
  
  document.getElementById("pasanSukses").innerHTML = sukses
};
function diskon(a) {  
// Input Data 
var harga = parseFloat(document.klinik.layanan.value);   
var uang = parseFloat(document.klinik.uang.value);   
var obat = parseFloat(document.klinik.obat.value);  
// JavaScript Matematik
var hargaDiskon= (100-a)*harga/100*obat
var totalDiskon = harga*obat-hargaDiskon
var nominal = uang - hargaDiskon
var kembali = uang - nominal
// Output Data 
 document.klinik.totalDiskon.value = rupiah(totalDiskon);
 document.klinik.nominal.value = rupiah(kembali);
 document.klinik.kembalian.value = rupiah(nominal);
}
// Formater IDR 
const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
      }
