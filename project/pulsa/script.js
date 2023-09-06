new Vue({
  el: ".header-nav",
  data: {
    nav: [
      { name: "Home", link: "/" },
      { name: "About", link: "/about" },
      { name: "Blog", link: "/blog" },
      { name: "Contact", link: "/contact" },
    ],
    pageLoaded: false,
  },
  mounted() {
    this.pageLoaded = true;
  },
});
new Vue({
  el: "#app",
  data: {
    pembayaran: { BRI: 7006876, DANA: 0821 },
    selectedCategory: "Pulsa",
    categories: ["Pulsa", "Token PLN", "Kirim Uang", "Crypto", "Convert Saldo"],
    operatorselular: ["Telkomsel", "Indosat", "XL Axiata", "Axis", "Byu"],
    listPulsa: [10000, 20000, 25000, 50000, 100000],
    listPln: [20000, 50000, 100000],
    selectedProvider: "",
    selectedNominal: "",
    selectedPembayaran: "",
    selectedToken: "",
    inputNohp: "",
    inputCryptoName: "",
    inputAmountCrypto: "",
    inputNamaRekCrypto: "",
    inputRekeningCrypto: "",
    selectedCrypto: "",
    price: "",
    amount: "",
  },
  methods: {
    async post(event) {
      event.preventDefault();

      const requestBody = {
        Produk: this.selectedCategory,
        Provider: this.selectedProvider,
        Nominal: this.selectedNominal,
        Nohp: this.inputNohp,
        Pembayaran: this.selectedPembayaran,
        withCredentials: true,
      };

      try {
        const response = await axios.post("/order", requestBody);
        if (response.status === 200) {
          console.log("Permintaan berhasil dengan status 200:", response.data);
          // Lakukan sesuatu dengan respons jika diperlukan
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        // Handle error
      }
    },
    handleInputNameCrypto() {
      const cryptoName = this.inputCryptoName.toUpperCase();
      axios
        .get(`https://api.binance.me/api/v1/ticker/price?symbol=${cryptoName}USDT`)
        .then((response) => {
          if (response.status === 200) {
            this.responseData = response.data;
            this.price = formatCurrency(response.data.price);
          }
        })
        .catch((error) => {
          this.price = "Crypto tidak tersedia..";
        });
    },
    async handleInputAmountCrypto() {
      let priceFloat = parseFloat(this.price.replace("$", ""));
      let amountUsd = priceFloat * parseFloat(this.inputAmountCrypto);

      if (this.price !== "" && this.inputAmountCrypto !== "") {
        axios
          .get(`https://api.binance.me/api/v1/ticker/price?symbol=USDTIDRT`)
          .then((response) => {
            if (response.status === 200) {
              let rate = parseFloat(response.data.price);
              let amountIdr = amountUsd * rate;
              let fee = 5000;
              if (amountIdr > 150000 && amountIdr <= 500000) {
                fee = fee * 2;
              } else if (amountIdr > 500000) {
                fee = (amountIdr * 3) / 100;
              }

              this.amount = `
            <p>${formatCurrency(amountUsd)}</p>
            <p>${formatUSDtoIDR(amountIdr)}</p>
            <p>Biaya transfer: ${formatUSDtoIDR(fee)}</p>`;
            }
          })
          .catch((error) => {
            this.price = "Crypto tidak tersedia..";
          });
      }
    },
  },
});

new Vue({
  el: ".c-media",
  data: {
    cMedia: [
      {
        iconClass: "fa fa-clock-o fa-stack-1x fa-inverse",
        text: "Isi ulang bisa kapan saja dan dimana saja dengan sistem otomatis online 24 jam non stop setiap harinya",
      },
      {
        iconClass: "fa fa-tags fa-stack-1x fa-inverse",
        text: "Produk yang tersedia lengkap dengan harga murah mulai nominal Rp. 1000,- dan potongan harga bagi reseller",
      },
      {
        iconClass: "fa fa-microchip fa-stack-1x fa-inverse",
        text: "Didukung software pulsa Otomax Ultimate Original yang memberikan kecepatan dalam pengisian kuota",
      },
      {
        iconClass: "fa fa-shield fa-stack-1x fa-inverse",
        text: "Tersedia laporan transaksi yang bisa dipantau setiap saat dan garansi uang kembali 100%",
      },
    ],
  },
});

const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const items = document.querySelectorAll(".item");

/* Toggle mobile menu */
function toggleMenu() {
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
    toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
  } else {
    menu.classList.add("active");
    toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
  }
}

/* Activate Submenu */
function toggleItem() {
  if (this.classList.contains("submenu-active")) {
    this.classList.remove("submenu-active");
  } else if (menu.querySelector(".submenu-active")) {
    menu.querySelector(".submenu-active").classList.remove("submenu-active");
    this.classList.add("submenu-active");
  } else {
    this.classList.add("submenu-active");
  }
}

/* Close Submenu From Anywhere */
function closeSubmenu(e) {
  if (menu.querySelector(".submenu-active")) {
    let isClickInside = menu.querySelector(".submenu-active").contains(e.target);

    if (!isClickInside && menu.querySelector(".submenu-active")) {
      menu.querySelector(".submenu-active").classList.remove("submenu-active");
    }
  }
}
/* Event Listeners */
toggle.addEventListener("click", toggleMenu, false);
for (let item of items) {
  if (item.querySelector(".submenu")) {
    item.addEventListener("click", toggleItem, false);
  }
  item.addEventListener("keypress", toggleItem, false);
}
document.addEventListener("click", closeSubmenu, false);

function formatCurrency(amount) {
  const parsedAmount = parseFloat(amount);
  if (!isNaN(parsedAmount)) {
    if (parsedAmount >= 1000) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(parsedAmount);
    } else {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 4 }).format(parsedAmount);
    }
  }
}

function formatUSDtoIDR(amount) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
}
