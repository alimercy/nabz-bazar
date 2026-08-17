const configs = {
  currency: {
    title: "بازار ارز", subtitle: "قیمت لحظه‌ای ارزهای آزاد",
    description: "نرخ زنده ارز، تغییرات روزانه، نمودار روند و ابزار تبدیل ارز در یک صفحه تخصصی.",
    mainId: "usd", mainLabel: "دلار آمریکا", unit: "تومان",
    tags: ["دلار آزاد", "یورو", "درهم", "لیر ترکیه"],
    stats: [["شاخص دلار","۱۰۳٫۲۸","۰٫۱۸٪+"],["تتر / تومان","۹۳٬۷۸۰","۰٫۲۹٪+"],["حجم بازار","۲٫۸ همت","۱۲٪+"],["حال بازار","صعودی","قدرت ۶۸٪"]],
    rows: [
      ["usd","🇺🇸","دلار آمریکا","USD / TOMAN",93250,.34],
      ["eur","🇪🇺","یورو","EUR / TOMAN",102480,-.18],
      ["aed","🇦🇪","درهم امارات","AED / TOMAN",25395,.26],
      ["gbp","🇬🇧","پوند انگلیس","GBP / TOMAN",119840,.44],
      ["try","🇹🇷","لیر ترکیه","TRY / TOMAN",2785,-.31],
      ["cad","🇨🇦","دلار کانادا","CAD / TOMAN",67920,.12],
      ["chf","🇨🇭","فرانک سوئیس","CHF / TOMAN",106300,.08]
    ],
    calcTitle:"مبدل ارز",calcDescription:"تبدیل سریع دلار به تومان بر اساس نرخ زنده.",calcInput:"مبلغ دلار",calcSuffix:"USD",calcRate:93250,
    insights:["فاصله نرخ خرید و فروش","عرضه و تقاضای بازار","مقایسه ارزهای منطقه"]
  },
  gold: {
    title:"طلا و سکه",subtitle:"تابلوی تخصصی بازار طلا",
    description:"قیمت لحظه‌ای طلا، انواع سکه، حباب بازار و اثر انس جهانی بر قیمت داخلی.",
    mainId:"gold18",mainLabel:"طلای ۱۸ عیار",unit:"تومان",
    tags:["طلای ۱۸ عیار","سکه امامی","انس جهانی","حباب سکه"],
    stats:[["انس جهانی","$۲٬۴۵۸","۰٫۴۱٪+"],["حباب سکه","۱۲٫۴٪","۰٫۸٪−"],["مثقال طلا","۲۹٫۷۸M","۰٫۸۲٪+"],["حال بازار","پر تقاضا","قدرت ۸۲٪"]],
    rows:[
      ["gold18","۱۸","طلای ۱۸ عیار","هر گرم",6874200,.82],
      ["gold24","۲۴","طلای ۲۴ عیار","هر گرم",9165600,.79],
      ["coin","●","سکه امامی","تک فروشی",78240000,-.12],
      ["halfCoin","½","نیم سکه","تک فروشی",43800000,.24],
      ["quarterCoin","¼","ربع سکه","تک فروشی",25800000,.31],
      ["goldOunce","Au","انس جهانی طلا","XAU / USD",2458,.41]
    ],
    calcTitle:"محاسبه‌گر طلا",calcDescription:"ارزش تقریبی طلا بر اساس وزن و نرخ روز.",calcInput:"وزن طلا",calcSuffix:"گرم",calcRate:6874200,
    insights:["راهنمای محاسبه اجرت","حباب سکه چیست؟","رابطه دلار و طلای داخلی"]
  },
  crypto: {
    title:"بازار رمزارز",subtitle:"داده‌های زنده دارایی‌های دیجیتال",
    description:"قیمت، تغییرات ۲۴ ساعته و نمای کلی رمزارزهای مهم بازار جهانی.",
    mainId:"bitcoin",mainLabel:"بیت‌کوین",unit:"دلار",
    tags:["بیت‌کوین","اتریوم","تتر","آلت‌کوین‌ها"],
    stats:[["ارزش کل بازار","$۲٫۱۸T","۱٫۲٪+"],["سلطه بیت‌کوین","۵۶٫۳٪","۰٫۳٪+"],["حجم ۲۴ ساعت","$۸۷B","۱۸٪+"],["ترس و طمع","۶۴","طمع"]],
    rows:[
      ["bitcoin","₿","بیت‌کوین","BTC / USD",61843,1.64],
      ["ethereum","Ξ","اتریوم","ETH / USD",2648,.98],
      ["tether","₮","تتر","USDT / USD",1,.01],
      ["solana","S","سولانا","SOL / USD",142.8,5.82],
      ["xrp","X","ریپل","XRP / USD",.58,-.42],
      ["bnb","B","بایننس کوین","BNB / USD",572.3,1.15]
    ],
    calcTitle:"ارزش رمزارز",calcDescription:"ارزش دلاری موجودی بیت‌کوین خود را محاسبه کنید.",calcInput:"مقدار بیت‌کوین",calcSuffix:"BTC",calcRate:61843,
    insights:["دامیننس بیت‌کوین","مدیریت ریسک رمزارز","کارمزد شبکه‌ها"]
  },
  stocks: {
    title:"بورس و فرابورس",subtitle:"نمای کامل بازار سرمایه ایران",
    description:"شاخص‌ها، نمادهای اثرگذار، جریان پول حقیقی و وضعیت لحظه‌ای بازار سرمایه.",
    mainId:"tedpix",mainLabel:"شاخص کل بورس",unit:"واحد",
    tags:["شاخص کل","هم‌وزن","فرابورس","ورود پول"],
    stats:[["شاخص هم‌وزن","۸۴۲٬۱۹۰","۰٫۳۸٪+"],["ارزش معاملات","۹٫۴ همت","۲۱٪+"],["ورود پول حقیقی","۴۸۰ میلیارد","مثبت"],["نمادهای مثبت","۳۸۲","۶۷٪ بازار"]],
    rows:[
      ["tedpix","شا","شاخص کل","TEDPIX",2684912,.57],
      ["equalIndex","هـ","شاخص هم‌وزن","EQUAL INDEX",842190,.38],
      ["fara","ف","شاخص فرابورس","IFX",26410,.21],
      ["foolad","فخ","فولاد مبارکه","فولاد",4280,1.72],
      ["fars","ف","صنایع پتروشیمی","فارس",7680,.91],
      ["khodro","خ","ایران خودرو","خودرو",3150,-.64]
    ],
    calcTitle:"محاسبه بازده",calcDescription:"بازده تقریبی سرمایه‌گذاری خود را محاسبه کنید.",calcInput:"سرمایه اولیه",calcSuffix:"تومان",calcRate:1.19,
    insights:["سرانه خرید حقیقی","قدرت خریدار و فروشنده","ارزش معاملات خرد"]
  },
  global: {
    title:"بازارهای جهانی",subtitle:"کالا، انرژی و شاخص‌های بین‌المللی",
    description:"رصد یکپارچه طلا، نفت، فلزات، شاخص‌های سهام و مهم‌ترین دارایی‌های جهانی.",
    mainId:"goldOunce",mainLabel:"انس جهانی طلا",unit:"دلار",
    tags:["طلا","نفت برنت","S&P 500","فلزات"],
    stats:[["شاخص دلار","۱۰۳٫۲۸","۰٫۱۸٪+"],["نفت برنت","$۸۱٫۳۲","۰٫۲۷٪+"],["S&P 500","۵٬۴۳۴","۰٫۳۵٪+"],["بازده اوراق ۱۰ساله","۴٫۲۳٪","۰٫۰۴٪−"]],
    rows:[
      ["goldOunce","Au","انس جهانی طلا","XAU / USD",2458,.41],
      ["brent","O","نفت برنت","BRENT / USD",81.32,.27],
      ["wti","W","نفت WTI","WTI / USD",77.18,.19],
      ["silver","Ag","نقره","XAG / USD",29.14,.68],
      ["sp500","S","اس‌اند‌پی ۵۰۰","S&P 500",5434,.35],
      ["nasdaq","N","نزدک","NASDAQ",17862,.48]
    ],
    calcTitle:"تبدیل انس طلا",calcDescription:"ارزش انس جهانی را با نرخ دلار داخلی محاسبه کنید.",calcInput:"تعداد انس",calcSuffix:"XAU",calcRate:2458,
    insights:["جلسات بانک مرکزی آمریکا","گزارش ذخایر نفت","چشم‌انداز فلزات گران‌بها"]
  }
};

const fa = value => new Intl.NumberFormat("fa-IR",{maximumFractionDigits:2}).format(value);
const money = (id,value) => ["bitcoin","ethereum","goldOunce","brent","wti","silver","solana","xrp","bnb","tether"].includes(id) ? `$${fa(value)}` : fa(Math.round(value));
const navItems=[["index.html","خانه","home"],["gold.html","طلا و سکه","gold"],["currency.html","ارز","currency"],["crypto.html","رمزارز","crypto"],["stocks.html","بورس","stocks"],["global.html","بازار جهانی","global"],["news.html","اخبار","news"]];
const page=document.body.dataset.market;

function header(active){
  return `<div class="mp-top"><div class="container"><div class="mp-live"><i></i><span>بازارها در حال بروزرسانی</span><b id="topTime"></b></div><div class="mp-top-links"><a href="news.html">اخبار بازار</a><a href="index.html#tools">ابزارها</a><a href="index.html#about">درباره ما</a></div></div></div>
  <header class="mp-header"><div class="container mp-nav">
    <a class="mp-brand" href="index.html"><span class="mp-logo"><svg viewBox="0 0 44 44"><path d="M7 29.5 15.5 21l6 5.5L36.5 11"/><path d="M29 11h7.5v7.5"/></svg></span><span><strong>نبض بازار</strong><small>مرجع هوشمند بازارهای مالی</small></span></a>
    <nav class="mp-links">${navItems.map(([href,label,key])=>`<a href="${href}" class="${key===active?"active":""}">${label}</a>`).join("")}</nav>
    <div class="mp-actions"><button class="mp-icon-btn" id="themeBtn" aria-label="پوسته">◐</button><button class="mp-menu" aria-label="منو"><span></span><span></span><span></span></button></div>
  </div></header>`;
}
function footer(){
  return `<footer class="mp-footer"><div class="container"><div class="footer-row"><div class="footer-about"><div class="mp-brand"><span class="mp-logo"><svg viewBox="0 0 44 44"><path d="M7 29.5 15.5 21l6 5.5L36.5 11"/><path d="M29 11h7.5v7.5"/></svg></span><span><strong>نبض بازار</strong><small>مرجع هوشمند بازارهای مالی</small></span></div><p>داده‌های سریع و قابل فهم برای تصمیم‌گیری آگاهانه در بازارهای مالی.</p></div><div><h4>بازارها</h4><a href="currency.html">ارز</a><a href="gold.html">طلا و سکه</a><a href="crypto.html">رمزارز</a></div><div><h4>تحلیل</h4><a href="stocks.html">بورس</a><a href="global.html">بازار جهانی</a><a href="news.html">اخبار</a></div><div><h4>دسترسی سریع</h4><a href="index.html">داشبورد</a><a href="index.html#tools">ابزارها</a><a href="index.html#about">درباره ما</a></div></div><div class="footer-bottom"><span>© ۱۴۰۵ نبض بازار</span><span>اطلاعات نمایش‌داده‌شده توصیه سرمایه‌گذاری نیست.</span></div></div></footer>`;
}
const rowHtml=row=>{
  const [id,icon,title,symbol,price,change]=row;
  const up=change>=0;
  return `<tr data-asset="${id}"><td><div class="asset-cell"><span class="asset-avatar">${icon}</span><div><strong>${title}</strong><small>${symbol}</small></div></div></td><td><strong data-field="price">${money(id,price)}</strong></td><td class="${up?"gain":"loss"}" data-field="change">${up?"+":"−"}${fa(Math.abs(change))}٪</td><td>${money(id,price*.992)}</td><td>${money(id,price*1.008)}</td><td><svg class="mini-line ${up?"":"loss-line"}" viewBox="0 0 80 25"><path d="${up?"M1 21 12 17 23 19 34 11 45 14 57 6 68 9 79 3":"M1 3 12 7 23 5 34 13 45 10 57 19 68 16 79 23"}"/></svg></td></tr>`;
};
function chartSvg(seed=1){
  const points=[];let value=190;
  for(let i=0;i<34;i++){value+=Math.sin(i*.83+seed)*10+(i%5===0?9:-1);points.push([i*(700/33),Math.max(25,Math.min(245,value-i*2.1))]);}
  const d=points.map((p,i)=>`${i?"L":"M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  return `<svg viewBox="0 0 700 270" preserveAspectRatio="none"><defs><linearGradient id="detailGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b9e6c" stop-opacity=".28"/><stop offset="1" stop-color="#0b9e6c" stop-opacity="0"/></linearGradient></defs><path class="area" d="${d} L700 270 L0 270Z"/><path class="line" d="${d}"/></svg>`;
}
function marketPage(c){
  const sub=["نمای کلی","نمودار قیمت","جدول بازار","ابزار محاسبه","راهنمای بازار"];
  return `${header(page)}
  <section class="page-hero"><div class="container page-hero-inner"><div><div class="breadcrumbs"><a href="index.html">خانه</a><span>/</span><b>${c.title}</b></div><h1>${c.title}</h1><p>${c.description}</p><div class="hero-tags">${c.tags.map(x=>`<span>${x}</span>`).join("")}</div></div>
  <div class="hero-market-card"><div class="hero-market-head"><span>${c.mainLabel}</span><span class="api-badge">داده زنده</span></div><div class="hero-main-price" data-main-price>— <small>${c.unit}</small></div><div class="hero-change" data-main-change>در حال دریافت...</div><div class="hero-spark"><svg viewBox="0 0 420 90" preserveAspectRatio="none"><defs><linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16c784" stop-opacity=".28"/><stop offset="1" stop-color="#16c784" stop-opacity="0"/></linearGradient></defs><path class="fill" d="M0 79C38 70 51 73 85 55s52 9 84-7 52-18 83-7 54-21 84-14 54-16 84-23v86H0Z"/><path d="M0 79C38 70 51 73 85 55s52 9 84-7 52-18 83-7 54-21 84-14 54-16 84-23"/></svg></div></div></div></section>
  <div class="subnav"><div class="container subnav-inner">${sub.map((x,i)=>`<a href="#${i===0?"overview":i===1?"chart":i===2?"table":i===3?"calculator":"guide"}" class="${i===0?"active":""}">${x}</a>`).join("")}<span class="api-status" id="apiStatus"><i></i><b>در حال اتصال...</b></span></div></div>
  <main class="page-main"><div class="container">
    <section class="stats-grid" id="overview">${c.stats.map(([label,value,delta],i)=>`<article class="stat-card"><div class="stat-card-head"><span>${label}</span><i>${["↗","◫","↔","◎"][i]}</i></div><strong>${value}</strong><small>${delta}</small></article>`).join("")}</section>
    <div class="content-grid"><div class="main-column">
      <section class="panel" id="chart"><div class="panel-head"><div><strong>روند تغییرات ${c.mainLabel}</strong><span>نمودار تعاملی قیمت</span></div><div class="range-tabs"><button>۱ روز</button><button class="active">۱ ماه</button><button>۳ ماه</button><button>۱ سال</button></div></div><div class="detail-chart"><div class="chart-lines"></div><div class="chart-axis"><span>بیشترین</span><span>میانگین</span><span>کمترین</span></div><div id="detailChart">${chartSvg()}</div></div></section>
      <section class="panel" id="table"><div class="panel-head"><div><strong>تابلوی کامل ${c.title}</strong><span>${c.rows.length} نماد منتخب بازار</span></div><div class="range-tabs table-filter"><button class="active">همه</button><button>صعودی</button><button>نزولی</button></div></div><div class="table-scroll"><table class="market-list"><thead><tr><th>عنوان</th><th>قیمت</th><th>تغییر</th><th>کمترین</th><th>بیشترین</th><th>روند</th></tr></thead><tbody>${c.rows.map(rowHtml).join("")}</tbody></table></div></section>
      <section class="info-grid" id="guide">${c.insights.map((x,i)=>`<article class="info-card"><span>راهنمای ${fa(i+1)}</span><h3>${x}</h3><p>داده‌ها، عوامل اثرگذار و نکات مهم این بخش را به زبان ساده مرور کنید.</p></article>`).join("")}</section>
    </div><aside class="side-column">
      <section class="panel calculator" id="calculator"><div class="panel-head" style="padding:0;min-height:45px"><div><strong>${c.calcTitle}</strong></div></div><p>${c.calcDescription}</p><div class="calc-field"><label>${c.calcInput}</label><div class="calc-input"><input id="calcAmount" type="number" value="${page==="crypto"?"0.1":page==="gold"?"10":"100"}" min="0"><span>${c.calcSuffix}</span></div></div><div class="calc-swap">↓</div><div class="calc-result"><span>ارزش تقریبی</span><strong id="calcResult">—</strong></div><p class="calc-note">محاسبه بر اساس آخرین نرخ دریافت‌شده انجام می‌شود.</p></section>
      <section class="panel watch-panel"><div class="watch-title"><strong>دیده‌بان من</strong><button id="addWatch">+ افزودن</button></div>${c.rows.slice(0,4).map(r=>`<div class="watch-item"><span class="asset-avatar">${r[1]}</span><div><strong>${r[2]}</strong><small>${r[3]}</small></div><span>${money(r[0],r[4])}<b>${r[5]>=0?"+":"−"}${fa(Math.abs(r[5]))}٪</b></span></div>`).join("")}</section>
      <section class="insight-panel"><span>تحلیل روز</span><h3>بازار در محدوده تصمیم</h3><p>برآیند داده‌های کوتاه‌مدت نشان می‌دهد معامله‌گران با احتیاط بیشتری فعالیت می‌کنند.</p><a href="news.html">خواندن تحلیل کامل ←</a></section>
    </aside></div></div></main>${footer()}<div class="toast" id="mpToast"><strong>انجام شد</strong><small>دارایی به دیده‌بان اضافه شد.</small></div>`;
}
function newsPage(){
  const cards=["اثر سیاست پولی بر بازار ارز","طلا در مسیر رکورد تازه","بازگشت تقاضا به بورس","بیت‌کوین و محدوده حساس قیمت","چشم‌انداز نفت در فصل جدید","سه سناریو برای بازارهای جهانی"];
  return `${header("news")}<section class="page-hero"><div class="container page-hero-inner"><div><div class="breadcrumbs"><a href="index.html">خانه</a><span>/</span><b>اخبار</b></div><h1>اخبار و تحلیل بازار</h1><p>مهم‌ترین رویدادها، تحلیل داده‌ها و دیدگاه کارشناسان بازارهای مالی.</p><div class="hero-tags"><span>آخرین اخبار</span><span>تحلیل روز</span><span>آموزش</span></div></div><div class="hero-market-card"><div class="hero-market-head"><span>نبض خبری امروز</span><span class="api-badge">۲۴ خبر تازه</span></div><div class="hero-main-price">۷۲ <small>امتیاز اهمیت</small></div><div class="hero-change">تمرکز بازار: ارز و طلا</div><div class="hero-spark">${chartSvg(3)}</div></div></div></section>
  <main class="page-main"><div class="container"><div class="news-page-grid"><article class="news-feature"><span class="news-tag">تحلیل ویژه</span><h2>بازارها در انتظار سیگنال تازه؛ سرمایه‌ها به کدام سمت می‌روند؟</h2><p>مرور جریان نقدینگی، رفتار معامله‌گران و متغیرهای کلیدی اثرگذار بر بازار امروز.</p></article><div class="news-side">${cards.slice(0,3).map((x,i)=>`<article class="news-card"><span>${["ارز","طلا","بورس"][i]}</span><h3>${x}</h3><small>${fa((i+1)*18)} دقیقه پیش · ۵ دقیقه مطالعه</small></article>`).join("")}</div></div><section class="all-news">${cards.map((x,i)=>`<article class="article-card"><div class="article-cover">${["$","Au","شا","₿","O","↗"][i]}</div><div class="article-body"><span>${["ارز","طلا و سکه","بورس","رمزارز","انرژی","جهانی"][i]}</span><h3>${x}</h3><p>بررسی آخرین داده‌ها و مهم‌ترین عوامل اثرگذار بر روند بازار.</p><small>${fa(i+1)} ساعت پیش</small></div></article>`).join("")}</section></div></main>${footer()}`;
}

document.getElementById("pageRoot").innerHTML=page==="news"?newsPage():marketPage(configs[page]);
if(localStorage.getItem("nabz-theme")==="dark")document.body.classList.add("dark");
document.getElementById("themeBtn")?.addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("nabz-theme",document.body.classList.contains("dark")?"dark":"light")});
document.querySelector(".mp-menu")?.addEventListener("click",()=>document.querySelector(".mp-links").classList.toggle("open"));
setInterval(()=>{const el=document.getElementById("topTime");if(el)el.textContent=new Date().toLocaleTimeString("fa-IR")},1000);

if(page!=="news"){
  const c=configs[page];let liveRate=c.calcRate;
  document.querySelector("[data-main-price]").innerHTML=`${money(c.mainId,c.rows[0][4])} <small>${c.unit}</small>`;
  document.querySelector("[data-main-change]").textContent=`${c.rows[0][5]>=0?"+":"−"}${fa(Math.abs(c.rows[0][5]))}٪ تغییر روزانه`;
  const updateCalc=()=>{const amount=Number(document.getElementById("calcAmount").value)||0;let result=amount*liveRate;if(page==="stocks")result=amount*liveRate;document.getElementById("calcResult").textContent=`${fa(Math.round(result))} ${page==="crypto"||page==="global"?"دلار":"تومان"}`};
  document.getElementById("calcAmount").addEventListener("input",updateCalc);updateCalc();
  fetch("/api/markets").then(r=>r.ok?r.json():Promise.reject()).then(data=>{
    const status=document.getElementById("apiStatus");status.classList.add("live");status.querySelector("b").textContent=`متصل به ${data.providers.join("، ")}`;
    for(const asset of data.assets){
      const row=document.querySelector(`[data-asset="${asset.id}"]`);
      if(row){row.querySelector('[data-field="price"]').textContent=money(asset.id,asset.price);const ch=row.querySelector('[data-field="change"]');ch.textContent=`${asset.change>=0?"+":"−"}${fa(Math.abs(asset.change))}٪`;ch.className=asset.change>=0?"gain":"loss";}
      if(asset.id===c.mainId){liveRate=asset.price;document.querySelector("[data-main-price]").innerHTML=`${money(asset.id,asset.price)} <small>${c.unit}</small>`;document.querySelector("[data-main-change]").textContent=`${asset.change>=0?"+":"−"}${fa(Math.abs(asset.change))}٪ تغییر روزانه`;updateCalc();}
    }
  }).catch(()=>{document.querySelector("#apiStatus b").textContent="داده نمایشی";document.querySelector("[data-main-price]").innerHTML=`${money(c.mainId,c.rows[0][4])} <small>${c.unit}</small>`;updateCalc()});
  document.querySelectorAll(".range-tabs:not(.table-filter) button").forEach((btn,i)=>btn.addEventListener("click",()=>{document.querySelector(".range-tabs:not(.table-filter) .active").classList.remove("active");btn.classList.add("active");document.getElementById("detailChart").innerHTML=chartSvg(i+2)}));
  document.querySelectorAll(".table-filter button").forEach((btn,i)=>btn.addEventListener("click",()=>{document.querySelector(".table-filter .active").classList.remove("active");btn.classList.add("active");document.querySelectorAll(".market-list tbody tr").forEach((row)=>{const ch=row.querySelector('[data-field="change"]');row.style.display=i===0||i===1&&ch.classList.contains("gain")||i===2&&ch.classList.contains("loss")?"":"none"})}));
  document.getElementById("addWatch").addEventListener("click",()=>{const t=document.getElementById("mpToast");t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2500)});
}
