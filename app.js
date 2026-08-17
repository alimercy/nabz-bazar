const toPersian = value => new Intl.NumberFormat("fa-IR").format(value);
const toPersianDecimal = value => new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 2 }).format(value);

const searchToggle = document.querySelector(".search-toggle");
const searchPanel = document.querySelector(".search-panel");
const searchInput = searchPanel.querySelector("input");

searchToggle.addEventListener("click", () => {
  searchPanel.classList.toggle("open");
  if (searchPanel.classList.contains("open")) setTimeout(() => searchInput.focus(), 200);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    searchPanel.classList.remove("open");
    closeModal();
  }
});

document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".main-nav").classList.toggle("open");
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => document.querySelector(".main-nav").classList.remove("open"));
});

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("nabz-theme", document.body.classList.contains("dark") ? "dark" : "light");
});
if (localStorage.getItem("nabz-theme") === "dark") document.body.classList.add("dark");

document.querySelectorAll(".chart-tabs button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".chart-tabs .selected").classList.remove("selected");
    button.classList.add("selected");
  });
});

document.querySelectorAll(".market-tabs button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".market-tabs .active").classList.remove("active");
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll("#marketRows tr").forEach(row => {
      row.classList.toggle("hidden-row", filter !== "all" && row.dataset.category !== filter);
    });
  });
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  document.querySelectorAll("#marketRows tr").forEach(row => {
    row.classList.toggle("hidden-row", query && !row.innerText.includes(query));
  });
});

const modal = document.getElementById("calculatorModal");
const amountInput = document.getElementById("dollarAmount");
const conversionResult = document.getElementById("conversionResult");
const openModal = () => {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => amountInput.focus(), 200);
};
const closeModal = () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

document.getElementById("openCalculator").addEventListener("click", openModal);
document.querySelector('[data-tool="converter"]').addEventListener("click", openModal);
modal.querySelector(".modal-close").addEventListener("click", closeModal);
modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);
amountInput.addEventListener("input", () => {
  conversionResult.textContent = toPersian((Number(amountInput.value) || 0) * 93250);
});

const toast = document.getElementById("toast");
let toastTimer;
const showToast = (title = "انجام شد", message = "درخواست شما با موفقیت ثبت شد.") => {
  toast.querySelector("strong").textContent = title;
  toast.querySelector("small").textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
};

document.getElementById("quickAlert").addEventListener("click", () => showToast("هشدار فعال شد", "تغییرات مهم بازار را به شما اطلاع می‌دهیم."));
document.querySelector(".watchlist-button").addEventListener("click", () => showToast("به دیده‌بان اضافه شد", "دارایی‌های منتخب در دسترس شما هستند."));
document.querySelectorAll(".tool-card:not([data-tool='converter'])").forEach(card => {
  card.addEventListener("click", () => showToast("به‌زودی", "این ابزار در نسخه بعدی فعال می‌شود."));
});

document.querySelector(".newsletter form").addEventListener("submit", event => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  if (!input.value || !input.value.includes("@")) {
    showToast("ایمیل نامعتبر", "لطفاً یک ایمیل معتبر وارد کنید.");
    input.focus();
    return;
  }
  showToast("عضویت انجام شد", "از این پس خلاصه بازار برایتان ارسال می‌شود.");
  input.value = "";
});

const updateClock = () => {
  const now = new Date();
  document.getElementById("updateTime").textContent = now.toLocaleTimeString("fa-IR", {
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  });
};
updateClock();
setInterval(updateClock, 1000);

const moneyFormat = (asset, value) => {
  const rounded = Math.round(value);
  return ["bitcoin", "ethereum", "goldOunce"].includes(asset) ? `$${toPersian(rounded)}` : toPersian(rounded);
};

const updateAssetRow = asset => {
  const row = document.querySelector(`[data-asset="${asset.id}"]`);
  if (!row) return;
  const price = row.querySelector('[data-field="price"]');
  const change = row.querySelector('[data-field="change"]');
  const low = row.querySelector('[data-field="low"]');
  const high = row.querySelector('[data-field="high"]');
  if (price) price.textContent = moneyFormat(asset.id, asset.price);
  if (low) low.textContent = moneyFormat(asset.id, asset.low ?? asset.price * .992);
  if (high) high.textContent = moneyFormat(asset.id, asset.high ?? asset.price * 1.008);
  if (change) {
    const isUp = Number(asset.change) >= 0;
    change.className = `change ${isUp ? "up" : "down"}`;
    change.textContent = `${toPersianDecimal(Math.abs(asset.change || 0))}٪ ${isUp ? "↑" : "↓"}`;
  }
  const ticker = document.querySelector(`[data-ticker="${asset.id}"]`);
  if (ticker) {
    const tickerPrice = ticker.querySelector("[data-live-value]");
    if (tickerPrice) {
      tickerPrice.dataset.liveValue = asset.price;
      tickerPrice.textContent = moneyFormat(asset.id, asset.price);
      tickerPrice.animate([{ opacity: .45 }, { opacity: 1 }], { duration: 500 });
    }
  }
  const overview = document.querySelector(`[data-overview="${asset.id}"]`);
  if (overview) {
    const overviewPrice = overview.querySelector("[data-overview-price]");
    const overviewChange = overview.querySelector(".overview-change");
    if (overviewPrice) overviewPrice.textContent = moneyFormat(asset.id, asset.price);
    if (overviewChange) {
      const isUp = Number(asset.change) >= 0;
      overviewChange.className = `overview-change ${isUp ? "up" : "down"}`;
      overviewChange.textContent = `${isUp ? "+" : "−"}${toPersianDecimal(Math.abs(asset.change || 0))}٪`;
    }
  }
};

const connectionDot = document.getElementById("connectionDot");
const connectionTitle = document.getElementById("connectionTitle");
const connectionMessage = document.getElementById("connectionMessage");
const refreshButton = document.getElementById("refreshData");

const loadMarketData = async (manual = false) => {
  refreshButton.classList.add("loading");
  if (manual) connectionMessage.textContent = "در حال دریافت آخرین قیمت‌ها...";
  try {
    const response = await fetch("/api/markets", { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`API ${response.status}`);
    const payload = await response.json();
    payload.assets.forEach(updateAssetRow);
    connectionDot.className = `connection-dot ${payload.live ? "live" : "error"}`;
    connectionTitle.textContent = payload.live ? "اتصال داده زنده برقرار است" : "داده جایگزین فعال است";
    const stamp = new Date(payload.updatedAt).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
    connectionMessage.textContent = `آخرین همگام‌سازی: ${stamp} — بروزرسانی خودکار هر ۶۰ ثانیه`;
    document.querySelectorAll("#dataSources span").forEach(source => {
      source.classList.toggle("active", payload.providers?.some(provider => source.textContent.toLowerCase().includes(provider.toLowerCase())));
    });
    if (manual) showToast("داده‌ها بروزرسانی شد", `${payload.assets.length} دارایی همگام‌سازی شد.`);
  } catch (error) {
    connectionDot.className = "connection-dot error";
    connectionTitle.textContent = "سرور API در دسترس نیست";
    connectionMessage.textContent = "سایت با داده نمایشی کار می‌کند — npm start را اجرا کنید";
    if (manual) showToast("خطا در اتصال", "سرور API اجرا نشده یا منبع داده پاسخ نمی‌دهد.");
  } finally {
    refreshButton.classList.remove("loading");
  }
};

refreshButton.addEventListener("click", () => loadMarketData(true));
loadMarketData();
setInterval(loadMarketData, 60000);

const investmentAmount = document.getElementById("investmentAmount");
const investmentMarket = document.getElementById("investmentMarket");
const updateInvestment = () => {
  const principal = Number(investmentAmount.value) || 0;
  const multiplier = Number(investmentMarket.value);
  const result = principal * multiplier;
  const profit = result - principal;
  document.getElementById("investmentResult").innerHTML = `${toPersian(Math.round(result))} <small>تومان</small>`;
  document.getElementById("returnAmount").textContent = `${profit >= 0 ? "+" : "−"}${toPersian(Math.abs(Math.round(profit)))} تومان`;
  document.getElementById("returnPercent").textContent = `${profit >= 0 ? "+" : "−"}${toPersianDecimal(Math.abs((multiplier - 1) * 100))}٪`;
};
investmentAmount.addEventListener("input", updateInvestment);
investmentMarket.addEventListener("change", updateInvestment);

document.querySelectorAll(".analytics-tabs button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".analytics-tabs .active").classList.remove("active");
    button.classList.add("active");
    document.querySelectorAll(".heat").forEach((tile, index) => {
      tile.animate(
        [{ opacity: .4, transform: "scale(.98)" }, { opacity: 1, transform: "scale(1)" }],
        { duration: 280 + index * 35, easing: "ease-out" }
      );
    });
  });
});
