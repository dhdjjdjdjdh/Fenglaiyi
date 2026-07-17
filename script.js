const KG_PER_SECOND = 62000000000 / (365 * 24 * 60 * 60);
const startTime = Date.now();

const countryData = [
  { country: "中国", total: 1206.6, perCapita: 8.5, rate: 16, market: 2417.4, collected: 195.2 },
  { country: "美国", total: 718.8, perCapita: 21.3, rate: 56, market: 918.5, collected: 405.4 },
  { country: "印度", total: 413.7, perCapita: 2.9, rate: 1, market: 1027.1, collected: 6.0 },
  { country: "日本", total: 263.8, perCapita: 21.2, rate: 23, market: 375.0, collected: 61.3 },
  { country: "巴西", total: 244.3, perCapita: 11.4, rate: 3, market: 321.0, collected: 7.9 },
  { country: "德国", total: 176.7, perCapita: 21.2, rate: 54, market: 175.6, collected: 95.7 },
  { country: "英国", total: 165.2, perCapita: 24.5, rate: 30, market: 159.4, collected: 50.2 },
  { country: "法国", total: 144.5, perCapita: 22.4, rate: 60, market: 166.7, collected: 86.1 }
];

const chinaTrend = [
  { year: 2018, generated: 955.8, collected: 154.6 },
  { year: 2019, generated: 1022.8, collected: 165.4 },
  { year: 2020, generated: 1085.3, collected: 175.6 },
  { year: 2021, generated: 1145.3, collected: 185.3 },
  { year: 2022, generated: 1206.6, collected: 195.2 }
];

const productionData = {
  "2023": [
    { label: "移动通信手持机", value: 156642.3, color: "#ffae00" },
    { label: "微型计算机设备", value: 33141.6, color: "#5f8792" },
    { label: "房间空气调节器", value: 24487.0, color: "#c8f000" },
    { label: "彩色电视机", value: 19339.6, color: "#2f5f7c" },
    { label: "家用电冰箱", value: 9632.3, color: "#e2643d" }
  ],
  "2024": [
    { label: "移动通信手持机", value: 166952.9, color: "#ffae00" },
    { label: "微型计算机设备", value: 33912.9, color: "#5f8792" },
    { label: "房间空气调节器", value: 26598.4, color: "#c8f000" },
    { label: "彩色电视机", value: 20745.4, color: "#2f5f7c" },
    { label: "家用电冰箱", value: 10395.7, color: "#e2643d" }
  ]
};

const digitalUsers = [
  { label: "移动电话用户", value: 17.90, color: "#ffae00" },
  { label: "移动互联网用户", value: 15.70, color: "#c8f000" },
  { label: "网民人数", value: 11.08, color: "#5f8792" },
  { label: "5G移动电话用户", value: 10.14, color: "#2f5f7c" }
];

const routeCopy = {
  drawer: { title: "留在抽屉", label: "闲置", text: "它没有马上污染环境，也没有进入回收。它只是从统计中沉下去，变成家中沉默的库存。" },
  resale: { title: "二手流通", label: "二手", text: "还能使用的设备被转卖、维修、翻新，寿命被拉长。但隐私清除、来源说明和最终去向仍需要被看见。" },
  formal: { title: "正规回收", label: "正规", text: "进入有资质的处理链条，拆解过程更可能被记录，材料也更可能回到循环利用体系。" },
  informal: { title: "非正规处理", label: "未记录", text: "当设备进入低价、分散和不透明的链条，收益可能被迅速取走，粉尘、燃烧和化学暴露却留在末端。" }
};

function formatNumber(value, decimal = 0) {
  return Number(value).toLocaleString("zh-CN", { maximumFractionDigits: decimal, minimumFractionDigits: decimal });
}

function svgEl(tag, attrs = {}) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

function updateProgress() {
  const bar = document.querySelector(".scroll-progress span");
  if (!bar) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = `${max > 0 ? Math.min(100, window.scrollY / max * 100) : 0}%`;
}

function updateCompareOnScroll() {
  const box = document.querySelector("[data-compare]");
  const hero = document.querySelector(".home-hero");
  if (!box || !hero) return;
  const start = hero.offsetTop;
  const distance = Math.max(1, hero.offsetHeight * 0.88);
  const pct = Math.max(0, Math.min(100, (window.scrollY - start) / distance * 100));
  box.style.setProperty("--split", `${pct}%`);
}
function updateTimer() {
  const h = document.getElementById("elapsedHour");
  const m = document.getElementById("elapsedMinute");
  const s = document.getElementById("nextSecond");
  const w = document.getElementById("wasteSinceOpen");
  if (!h && !m && !s && !w) return;
  const elapsed = Math.max(0, (Date.now() - startTime) / 1000);
  const hour = Math.floor(elapsed / 3600);
  const minute = Math.floor((elapsed % 3600) / 60);
  const next = 60 - Math.floor(elapsed % 60);
  const kg = elapsed * KG_PER_SECOND;
  if (h) h.textContent = hour;
  if (m) m.textContent = minute;
  if (s) s.textContent = next === 60 ? 60 : next;
  if (w) { w.textContent = formatNumber(Math.round(kg), 0); fitTimerNumber(w); }
}

function fitTimerNumber(el) {
  const len = (el.textContent || "").length;
  let size = "clamp(2.4rem, 4.2vw, 4.3rem)";
  if (len >= 12) size = "clamp(1.65rem, 2.7vw, 2.7rem)";
  else if (len >= 10) size = "clamp(1.9rem, 3.2vw, 3.2rem)";
  else if (len >= 8) size = "clamp(2.15rem, 3.6vw, 3.6rem)";
  el.style.fontSize = size;
}
function animateCounters(root = document) {
  root.querySelectorAll("[data-count]").forEach(counter => {
    if (counter.dataset.done === "1") return;
    counter.dataset.done = "1";
    const target = Number(counter.dataset.count);
    const decimals = Number(counter.dataset.decimals || 0);
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / 1100, 1);
      const e = 1 - Math.pow(1 - p, 3);
      counter.textContent = formatNumber(target * e, decimals);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

function animateSvg(root = document) {
  root.querySelectorAll(".bar-grow").forEach(bar => {
    requestAnimationFrame(() => bar.setAttribute("width", bar.dataset.targetWidth || 0));
  });
  root.querySelectorAll(".line-grow").forEach(path => {
    requestAnimationFrame(() => { path.style.strokeDashoffset = "0"; });
  });
  root.querySelectorAll(".hundred-grid").forEach(grid => grid.classList.add("is-visible"));
}

function setupObservers() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      animateCounters(entry.target);
      animateSvg(entry.target);
    });
  }, { threshold: .22 });
  document.querySelectorAll(".story-section,.viz-panel,.stat-duo,.hundred-grid,.word-cloud,.route-visual").forEach(el => obs.observe(el));
}

function finalizeChart(container) {
  const visibleRoot = container.closest(".is-visible");
  if (visibleRoot) requestAnimationFrame(() => animateSvg(visibleRoot));
}

function addSource(svg, x, y, text, dark = false, maxWidth) {
  const viewBox = (svg.getAttribute("viewBox") || "0 0 900 500").split(/\s+/).map(Number);
  const width = viewBox[2] || 900;
  const usable = maxWidth || Math.max(220, width - x - 28);
  const maxChars = Math.max(18, Math.floor(usable / 14));
  const chunks = [];
  let line = "";
  Array.from(text || "").forEach(ch => {
    line += ch;
    if (line.length >= maxChars && /[，；、,;\s]/.test(ch)) {
      chunks.push(line.trim());
      line = "";
    } else if (line.length >= maxChars + 4) {
      chunks.push(line.trim());
      line = "";
    }
  });
  if (line.trim()) chunks.push(line.trim());
  const lines = (chunks.length ? chunks : [""]).slice(0, 4);
  const lineHeight = 18;
  const baseY = y > 80 ? Math.max(22, y - Math.max(0, lines.length - 1) * lineHeight) : y;
  const source = svgEl("text", { x, y: baseY, fill: dark ? "rgba(255,255,255,.66)" : "#65716d", "font-size": 15 });
  lines.forEach((part, i) => {
    const tspan = svgEl("tspan", { x, dy: i === 0 ? 0 : lineHeight });
    tspan.textContent = part;
    source.appendChild(tspan);
  });
  svg.appendChild(source);
}
function horizontalBarChart(containerId, data, opts = {}) {
  const c = document.getElementById(containerId);
  if (!c) return;
  const width = opts.width || 900;
  const height = opts.height || 500;
  const m = opts.margin || { top: 92, right: 138, bottom: 66, left: 142 };
  const innerW = width - m.left - m.right;
  const rowH = (height - m.top - m.bottom) / data.length;
  const max = Math.max(...data.map(d => d.value)) * 1.04;
  const svg = svgEl("svg", { viewBox: `0 0 ${width} ${height}` });
  const title = svgEl("text", { x: m.left, y: 34, fill: opts.dark ? "#fff" : "#101413", "font-size": 23, "font-weight": 900 });
  title.textContent = opts.title || "";
  svg.appendChild(title);
  const sub = opts.subtitle ? svgEl("text", { x: m.left, y: 60, fill: opts.dark ? "rgba(255,255,255,.72)" : "#65716d", "font-size": 15, "font-weight": 700 }) : null;
  if (sub) { sub.textContent = opts.subtitle; svg.appendChild(sub); }
  data.forEach((d, i) => {
    const y = m.top + i * rowH + Math.max(8, rowH * .18);
    const barH = Math.min(32, rowH * .48);
    const targetW = d.value / max * innerW;
    const label = svgEl("text", { x: m.left - 16, y: y + barH * .68, fill: opts.dark ? "#f1f5ef" : "#2f3a36", "font-size": 17, "font-weight": 800, "text-anchor": "end" });
    label.textContent = d.label;
    svg.appendChild(label);
    svg.appendChild(svgEl("rect", { x: m.left, y, width: innerW, height: barH, fill: opts.dark ? "rgba(255,255,255,.10)" : "#e0e6dd" }));
    svg.appendChild(svgEl("rect", { class: "bar-grow", x: m.left, y, width: 0, height: barH, fill: d.color || "#5f8792", "data-target-width": targetW }));
    const valueInside = targetW > 128;
    const value = svgEl("text", {
      class: "value-pop",
      x: valueInside ? m.left + Math.max(44, targetW - 12) : Math.min(m.left + targetW + 12, width - m.right + 18),
      y: y + barH * .68,
      fill: valueInside && !opts.dark ? "#101413" : opts.dark ? "#fff" : "#26302d",
      "font-size": 16,
      "font-weight": 900,
      "text-anchor": valueInside ? "end" : "start"
    });
    value.textContent = `${formatNumber(d.value, opts.decimal || 0)}${opts.unit || ""}`;
    svg.appendChild(value);
  });
  addSource(svg, m.left, height - 18, opts.source || "", opts.dark);
  c.replaceChildren(svg);
  finalizeChart(c);
}
function verticalBarChart(containerId, data, opts = {}) {
  const c = document.getElementById(containerId);
  if (!c) return;
  const width = opts.width || 860;
  const height = opts.height || 520;
  const m = opts.margin || { top: 104, right: 42, bottom: 92, left: 76 };
  const innerW = width - m.left - m.right;
  const innerH = height - m.top - m.bottom;
  const max = Math.max(...data.map(d => d.value)) * 1.35;
  const svg = svgEl("svg", { viewBox: `0 0 ${width} ${height}` });
  const title = svgEl("text", { x: m.left, y: 34, fill: "#101413", "font-size": 23, "font-weight": 900 });
  title.textContent = opts.title || "";
  svg.appendChild(title);
  if (opts.subtitle) {
    const subtitle = svgEl("text", { x: m.left, y: 60, fill: "#65716d", "font-size": 15, "font-weight": 700 });
    subtitle.textContent = opts.subtitle;
    svg.appendChild(subtitle);
  }
  [0, .25, .5, .75, 1].forEach(t => {
    const y = m.top + innerH - innerH * t;
    svg.appendChild(svgEl("line", { x1: m.left, x2: width - m.right, y1: y, y2: y, stroke: "#dce2d9" }));
  });
  const slot = innerW / data.length;
  data.forEach((d, i) => {
    const barW = Math.min(76, slot * .48);
    const x = m.left + i * slot + slot / 2 - barW / 2;
    const targetH = d.value / max * innerH;
    const baseY = m.top + innerH;
    const finalY = baseY - targetH;
    svg.appendChild(svgEl("rect", { x, y: m.top, width: barW, height: innerH, fill: "#e0e6dd" }));
    const liveBar = svgEl("rect", { class: "vbar-grow", x, y: baseY, width: barW, height: 0, fill: d.color, "data-target-height": targetH, "data-base-y": baseY });
    liveBar.style.transition = "y 1.2s cubic-bezier(.2,.8,.2,1), height 1.2s cubic-bezier(.2,.8,.2,1)";
    svg.appendChild(liveBar);
    const value = svgEl("text", { class: "value-pop", x: x + barW / 2, y: Math.max(finalY + 28, m.top + 30), fill: "#101413", "font-size": 16, "font-weight": 900, "text-anchor": "middle" });
    value.textContent = `${formatNumber(d.value, opts.decimal || 0)}${opts.unit || ""}`;
    svg.appendChild(value);
    const label = svgEl("text", { x: x + barW / 2, y: height - 48, fill: "#2f3a36", "font-size": 16, "font-weight": 700, "text-anchor": "middle" });
    label.textContent = d.label;
    svg.appendChild(label);
  });
  addSource(svg, m.left, height - 18, opts.source || "");
  c.replaceChildren(svg);
  finalizeChart(c);
}
function animateVerticalBars(root = document) {
  root.querySelectorAll(".vbar-grow").forEach(rect => {
    const h = Number(rect.dataset.targetHeight || 0);
    const base = Number(rect.dataset.baseY || rect.getAttribute("y"));
    requestAnimationFrame(() => {
      rect.setAttribute("height", h);
      rect.setAttribute("y", base - h);
    });
  });
}

const oldAnimateSvg = animateSvg;
animateSvg = function(root = document) {
  oldAnimateSvg(root);
  animateVerticalBars(root);
};

function drawCountryChart(mode = "total") {
  const sorted = [...countryData].sort((a, b) => b[mode] - a[mode]);
  horizontalBarChart("countryChart", sorted.map(d => ({
    label: d.country,
    value: d[mode],
    color: d.country === "中国" ? "#c8f000" : "#5f8792"
  })), {
    dark: true,
    title: mode === "total" ? "跨国统一口径：2022年电子废弃物产生量" : "跨国统一口径：2022年人均电子废弃物产生量",
    unit: mode === "total" ? " 万吨" : " kg/人",
    decimal: 1,
    source: "数据来源：全球电子废弃物统计伙伴关系（Global E-waste Statistics Partnership）2022 country sheets；用于跨国比较"
  });
}

function drawProductionChart(year = "2024") {
  horizontalBarChart("productionChart", productionData[year], {
    title: `${year}年中国主要电子电器产品产量`,
    unit: " 万台",
    decimal: 1,
    source: `数据来源：国家统计局《${year}年国民经济和社会发展统计公报》`
  });
}

function drawDigitalUsersChart() {
  verticalBarChart("digitalUsersChart", digitalUsers, {
    title: "2024年中国数字生活前端规模",
    unit: " 亿",
    decimal: 2,
    source: "数据来源：国家统计局《2024年国民经济和社会发展统计公报》"
  });
}

function drawGlobalTimeline() {
  verticalBarChart("globalTimelineChart", [
    { label: "2010", value: 34.1, color: "#5f8792" },
    { label: "2022", value: 62.0, color: "#ffae00" },
    { label: "2030预测", value: 82.0, color: "#c8f000" }
  ], {
    title: "全球电子废弃物增长趋势",
    unit: " 百万吨",
    decimal: 1,
    source: "数据来源：联合国训练研究所（United Nations Institute for Training and Research）与国际电信联盟（International Telecommunication Union）《Global E-waste Monitor 2024》；2010为报告增幅折算",
    width: 560,
    height: 340,
    margin: { top: 78, right: 28, bottom: 88, left: 56 }
  });
}


function drawGlobalCollectionMini() {
  horizontalBarChart("globalCollectionMini", [
    { label: "正式记录回收", value: 22.3, color: "#c8f000" },
    { label: "未被正式记录", value: 77.7, color: "#ffae00" }
  ], {
    title: "电子废弃物去向是否被记录",
    unit: "%",
    decimal: 1,
    source: "数据来源：联合国训练研究所（United Nations Institute for Training and Research）与国际电信联盟（International Telecommunication Union）《Global E-waste Monitor 2024》",
    width: 440,
    height: 340,
    margin: { top: 82, right: 44, bottom: 86, left: 126 }
  });
}
function drawMarketVsWaste() {
  horizontalBarChart("marketVsWasteChart", [
    { label: "投放市场设备", value: 2417.4, color: "#c8f000" },
    { label: "电子废弃物产生", value: 1206.6, color: "#ffae00" },
    { label: "正式收集", value: 195.2, color: "#5f8792" }
  ], {
    title: "中国2022年：进入市场、成为废弃物、被正式收集",
    unit: " 万吨",
    decimal: 1,
    source: "数据来源：全球电子废弃物统计伙伴关系（Global E-waste Statistics Partnership）China 2022；跨国统一口径"
  });
}

function drawGapStack() {
  horizontalBarChart("gapStackChart", chinaTrend.map(d => ({
    label: String(d.year),
    value: d.generated - d.collected,
    color: "#ffae00"
  })), {
    title: "产生量减去正式收集量之后的缺口",
    unit: " 万吨",
    decimal: 1,
    source: "数据来源：全球电子废弃物统计伙伴关系（Global E-waste Statistics Partnership）；计算：产生量-正式收集量"
  });
}

function drawChinaTrend() {
  const c = document.getElementById("chinaTrendChart");
  if (!c) return;
  const width = 860;
  const height = 520;
  const m = { top: 92, right: 42, bottom: 72, left: 78 };
  const innerW = width - m.left - m.right;
  const innerH = height - m.top - m.bottom;
  const max = 1300;
  const x = year => m.left + ((year - 2018) / 4) * innerW;
  const y = value => m.top + innerH - (value / max) * innerH;
  const svg = svgEl("svg", { viewBox: `0 0 ${width} ${height}` });
  const title = svgEl("text", { x: m.left, y: 34, fill: "#101413", "font-size": 23, "font-weight": 900 });
  title.textContent = "中国电子废弃物产生量与正式收集量";
  svg.appendChild(title);
  [0, 300, 600, 900, 1200].forEach(tick => {
    const gy = y(tick);
    svg.appendChild(svgEl("line", { x1: m.left, x2: width - m.right, y1: gy, y2: gy, stroke: "#dce2d9" }));
    const lab = svgEl("text", { x: m.left - 12, y: gy + 5, fill: "#65716d", "font-size": 15, "text-anchor": "end" });
    lab.textContent = tick;
    svg.appendChild(lab);
  });
  chinaTrend.forEach(d => {
    const year = svgEl("text", { x: x(d.year), y: height - 42, fill: "#65716d", "font-size": 15, "text-anchor": "middle" });
    year.textContent = d.year;
    svg.appendChild(year);
  });
  function line(key, color) {
    const d = chinaTrend.map((p, i) => `${i ? "L" : "M"} ${x(p.year)} ${y(p[key])}`).join(" ");
    const path = svgEl("path", { class: "line-grow", d, fill: "none", stroke: color, "stroke-width": 5, "stroke-linecap": "round" });
    path.style.strokeDasharray = 1400;
    path.style.strokeDashoffset = 1400;
    return path;
  }
  svg.appendChild(line("generated", "#ffae00"));
  svg.appendChild(line("collected", "#5f8792"));
  chinaTrend.forEach(d => {
    [["generated", "#ffae00"], ["collected", "#5f8792"]].forEach(([key, color]) => {
      svg.appendChild(svgEl("circle", { class: "dot-pop", cx: x(d.year), cy: y(d[key]), r: 5.5, fill: color, stroke: "#fff", "stroke-width": 2 }));
    });
  });
  const legend1 = svgEl("text", { x: m.left, y: 64, fill: "#ffae00", "font-size": 15, "font-weight": 900 });
  legend1.textContent = "产生量";
  const legend2 = svgEl("text", { x: m.left + 86, y: 64, fill: "#5f8792", "font-size": 15, "font-weight": 900 });
  legend2.textContent = "正式收集量";
  svg.appendChild(legend1);
  svg.appendChild(legend2);
  addSource(svg, m.left, height - 18, "单位：万吨。数据来源：全球电子废弃物统计伙伴关系（Global E-waste Statistics Partnership）；跨国统一口径");
  c.replaceChildren(svg);
  finalizeChart(c);
}

function drawDonut(id, data, centerText, source, unit = "") {
  const c = document.getElementById(id);
  if (!c) return;
  const w = 560;
  const h = 390;
  const cx = 278;
  const cy = 194;
  const r = 116;
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const svg = svgEl("svg", { viewBox: `0 0 ${w} ${h}` });
  svg.appendChild(svgEl("circle", { cx, cy, r, fill: "none", stroke: "#e0e5dd", "stroke-width": 38 }));
  let offset = 0;
  data.forEach((d, i) => {
    const pct = d.value / total * 100;
    const arc = svgEl("circle", {
      class: "donut-arc",
      cx, cy, r,
      fill: "none",
      stroke: d.color,
      "stroke-width": 38,
      "stroke-linecap": i === data.length - 1 ? "butt" : "round",
      "pathLength": 100,
      "stroke-dasharray": `${pct} ${100 - pct}`,
      "stroke-dashoffset": -offset,
      transform: `rotate(-90 ${cx} ${cy})`
    });
    svg.appendChild(arc);
    offset += pct;
  });
  svg.appendChild(svgEl("circle", { cx, cy, r: 72, fill: "#fff" }));
  const center = svgEl("text", { x: cx, y: cy + 6, "text-anchor": "middle", "font-size": 30, "font-weight": 900, fill: "#101413" });
  center.textContent = centerText;
  svg.appendChild(center);
  let ly = 42;
  data.forEach(d => {
    svg.appendChild(svgEl("rect", { x: 28, y: ly - 13, width: 14, height: 14, fill: d.color }));
    const label = svgEl("text", { x: 50, y: ly, fill: "#3f4b47", "font-size": 15 });
    label.textContent = `${d.label} ${formatNumber(d.value, 1)}${unit}`;
    svg.appendChild(label);
    ly += 26;
  });
  addSource(svg, 28, h - 10, source);
  c.replaceChildren(svg);
}

function drawGlobalGauge() {
  drawDonut("globalGauge", [
    { label: "正式记录回收", value: 22.3, color: "#c8f000" },
    { label: "未正式记录", value: 77.7, color: "#dfe5df" }
  ], "22.3%", "数据来源：联合国训练研究所（United Nations Institute for Training and Research）与国际电信联盟（International Telecommunication Union）《Global E-waste Monitor 2024》", "%");
}

function drawRadar(id, labels, series, title, source) {
  const c = document.getElementById(id);
  if (!c) return;
  const w = 590;
  const h = 440;
  const cx = 295;
  const cy = 222;
  const r = 140;
  const svg = svgEl("svg", { viewBox: `0 0 ${w} ${h}` });
  const chartTitle = svgEl("text", { x: 28, y: 28, fill: "#101413", "font-size": 23, "font-weight": 900 });
  chartTitle.textContent = title;
  svg.appendChild(chartTitle);
  for (let level = 1; level <= 5; level += 1) {
    const pts = labels.map((_, i) => {
      const a = -Math.PI / 2 + i * Math.PI * 2 / labels.length;
      return `${cx + r * level / 5 * Math.cos(a)},${cy + r * level / 5 * Math.sin(a)}`;
    }).join(" ");
    svg.appendChild(svgEl("polygon", { points: pts, fill: "none", stroke: "#d9ded8" }));
  }
  labels.forEach((lab, i) => {
    const a = -Math.PI / 2 + i * Math.PI * 2 / labels.length;
    svg.appendChild(svgEl("line", { x1: cx, y1: cy, x2: cx + r * Math.cos(a), y2: cy + r * Math.sin(a), stroke: "#d9ded8" }));
    const t = svgEl("text", { x: cx + (r + 28) * Math.cos(a), y: cy + (r + 28) * Math.sin(a) + 5, "text-anchor": "middle", fill: "#3f4b47", "font-size": 15 });
    t.textContent = lab;
    svg.appendChild(t);
  });
  series.forEach(s => {
    const pts = s.values.map((v, i) => {
      const a = -Math.PI / 2 + i * Math.PI * 2 / labels.length;
      return `${cx + r * v * Math.cos(a)},${cy + r * v * Math.sin(a)}`;
    }).join(" ");
    svg.appendChild(svgEl("polygon", { class: "radar-poly", points: pts, fill: s.fill, stroke: s.color, "stroke-width": 3 }));
  });
  let lx = 30;
  series.forEach(s => {
    svg.appendChild(svgEl("rect", { x: lx, y: 48, width: 16, height: 16, fill: s.color }));
    const t = svgEl("text", { x: lx + 22, y: 61, fill: "#3f4b47", "font-size": 15 });
    t.textContent = s.name;
    svg.appendChild(t);
    lx += 96;
  });
  addSource(svg, 28, h - 52, source);
  c.replaceChildren(svg);
}

function setupRadar() {
  drawRadar("radarChart", ["总量", "人均", "正式收集率", "投放市场", "正式收集量"], [
    { name: "中国", color: "#ffae00", fill: "rgba(255,174,0,.18)", values: [1, .35, .27, 1, .48] },
    { name: "美国", color: "#5f8792", fill: "rgba(95,135,146,.18)", values: [.60, .87, .93, .38, 1] },
    { name: "印度", color: "#c8f000", fill: "rgba(200,240,0,.16)", values: [.34, .12, .02, .42, .01] }
  ], "中美印压力结构对照", "数据来源：全球电子废弃物统计伙伴关系（Global E-waste Statistics Partnership）2022 country sheets");
  drawRadar("riskRadar", ["粉尘", "危险物", "劳动强度", "信息不透明", "健康暴露"], [
    { name: "前端使用", color: "#5f8792", fill: "rgba(95,135,146,.16)", values: [.2, .35, .28, .22, .18] },
    { name: "末端处理", color: "#ffae00", fill: "rgba(255,174,0,.2)", values: [.95, .9, .82, .86, .88] }
  ], "风险沿链条向末端集中", "风险维度依据世界卫生组织（World Health Organization）电子废弃物与儿童健康报告整理，非量化监测值");
}

function drawWordCloud() {
  const clouds = {
    global: [["电子废弃物",46,50,47],["跨境流动",30,28,33],["正式回收",34,70,35],["手机",28,42,66],["屏幕",26,72,66],["电池",30,22,74],["塑料",24,84,46],["金属",34,48,24],["非正规回收",28,62,78],["抽屉库存",26,18,54],["材料价值",26,34,82],["污染",24,83,78]],
    risk: [["粉尘",42,47,40],["焊料",30,27,32],["酸洗",34,67,35],["儿童",38,38,64],["女性",32,70,66],["劳动",42,52,74],["拆解",36,22,75],["低价",24,80,48],["身体暴露",30,52,18],["风险转移",34,76,82],["维修",24,18,50],["分拣",22,34,86]]
  };
  document.querySelectorAll(".word-cloud").forEach(el => {
    const words = clouds[el.dataset.cloud] || clouds.global;
    el.innerHTML = "";
    words.forEach(([text, size, x, y], i) => {
      const span = document.createElement("span");
      span.className = "cloud-word";
      span.textContent = text;
      span.style.fontSize = `${size}px`;
      span.style.left = `${x}%`;
      span.style.top = `${y}%`;
      span.style.transitionDelay = `${i * 45}ms`;
      el.appendChild(span);
    });
  });
}

async function drawGlobalDistributionMap() {
  const container = document.getElementById("globalDistributionMap");
  if (!container) return;
  const storyBox = document.querySelector(".continent-story");
  const storyLabel = document.getElementById("continentStoryLabel");
  const storyText = document.getElementById("continentStoryText");
  let typingTimer;
  const width = 920;
  const height = 460;
  const svg = svgEl("svg", { viewBox: `0 0 ${width} ${height}`, "aria-hidden": "true" });
  const project = ([lon, lat]) => [((lon + 180) / 360) * width, ((90 - lat) / 180) * height];

  for (let lon = -150; lon <= 150; lon += 30) {
    const [x] = project([lon, 0]);
    svg.appendChild(svgEl("line", { class: "map-graticule", x1: x, y1: 0, x2: x, y2: height }));
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    const [, y] = project([0, lat]);
    svg.appendChild(svgEl("line", { class: "map-graticule", x1: 0, y1: y, x2: width, y2: y }));
  }

  try {
    const topology = await fetch("assets/data/countries-110m.json").then(response => {
      if (!response.ok) throw new Error("map data unavailable");
      return response.json();
    });
    const { scale, translate } = topology.transform;
    const decodedArcs = topology.arcs.map(arc => {
      let x = 0;
      let y = 0;
      return arc.map(([dx, dy]) => {
        x += dx;
        y += dy;
        return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
      });
    });
    const arcPoints = index => {
      const points = decodedArcs[index < 0 ? ~index : index];
      return index < 0 ? [...points].reverse() : points;
    };
    const ringPath = ring => {
      const points = ring.flatMap((index, i) => {
        const arc = arcPoints(index);
        return i === 0 ? arc : arc.slice(1);
      });
      return points.map((point, i) => {
        const [x, y] = project(point);
        return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
      }).join("") + "Z";
    };
    topology.objects.countries.geometries.forEach(geometry => {
      const polygons = geometry.type === "Polygon" ? [geometry.arcs] : geometry.arcs;
      const d = polygons.flatMap(polygon => polygon.map(ringPath)).join("");
      const focus = Number(geometry.id) === 156;
      svg.appendChild(svgEl("path", { class: `map-country${focus ? " is-focus" : ""}`, d }));
    });
  } catch (error) {
    const fallback = svgEl("text", { x: width / 2, y: height / 2, "text-anchor": "middle", fill: "#aeb9b5", "font-size": 18 });
    fallback.textContent = "地图轮廓载入中";
    svg.appendChild(fallback);
  }

  const regions = [
    { name: "美洲", value: "1442.7", lon: -92, lat: 18, r: 43, story: "2019 年，美洲产生 1347.8 万吨电子废弃物；到 2022 年升至 1442.7 万吨。三年增加 94.9 万吨，折合每天约新增 867 吨，正式回收率为 30%。" },
    { name: "欧洲", value: "1307.6", lon: 16, lat: 54, r: 39, story: "2019 年，欧洲产生 1251.3 万吨电子废弃物；到 2022 年升至 1307.6 万吨。三年增加 56.3 万吨，折合每天约新增 514 吨；正式回收率为 43%，居各洲首位。" },
    { name: "亚洲", value: "3014.7", lon: 96, lat: 30, r: 58, story: "2019 年，亚洲产生 2568.0 万吨电子废弃物；到 2022 年升至 3014.7 万吨。仅三年就增加 446.7 万吨，折合每天约新增 4080 吨，但正式回收率仍只有 12%。" },
    { name: "非洲", value: "355.1", lon: 20, lat: 2, r: 25, story: "2019 年，非洲产生 312.1 万吨电子废弃物；到 2022 年升至 355.1 万吨。三年增加 43.0 万吨，折合每天约新增 393 吨；正式回收率仅 1%。" },
    { name: "大洋洲", value: "70.7", lon: 138, lat: -30, r: 16, story: "2022 年，大洋洲产生 70.7 万吨电子废弃物。总量最小，人均产生量却达到 16.1 千克，正式回收率为 41%；总量小并不意味着消费压力低。" }
  ];
  const typeStory = (region, group) => {
    if (!storyBox || !storyLabel || !storyText) return;
    clearInterval(typingTimer);
    svg.querySelectorAll(".map-bubble").forEach(bubble => bubble.classList.remove("is-active"));
    group.classList.add("is-active");
    storyBox.classList.remove("is-complete");
    storyLabel.textContent = `${region.name} / 2019—2022`;
    storyText.textContent = "";
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      storyText.textContent = region.story;
      storyBox.classList.add("is-complete");
      return;
    }
    let index = 0;
    typingTimer = setInterval(() => {
      index += 1;
      storyText.textContent = region.story.slice(0, index);
      if (index >= region.story.length) {
        clearInterval(typingTimer);
        storyBox.classList.add("is-complete");
      }
    }, 34);
  };
  regions.forEach((region, index) => {
    const [x, y] = project([region.lon, region.lat]);
    const bubbleRadius = Math.max(region.r, 20 + region.value.length * 3);
    const group = svgEl("g", { class: "map-bubble", style: `--map-delay:${.3 + index * .14}s`, role: "button", tabindex: "0", "aria-label": `查看${region.name}电子废弃物增量` });
    group.appendChild(svgEl("circle", { cx: x, cy: y, r: bubbleRadius }));
    const label = svgEl("text", { class: "map-region", x, y: y - 4, "text-anchor": "middle" });
    label.textContent = region.name;
    const value = svgEl("text", { class: "map-value", x, y: y + 18, "text-anchor": "middle" });
    value.textContent = region.value;
    group.append(label, value);
    group.addEventListener("click", () => typeStory(region, group));
    group.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      typeStory(region, group);
    });
    svg.appendChild(group);
  });
  container.replaceChildren(svg);
}

function drawPlatformClouds() {
  const platformClouds = {
    zhihu: [["隐私清除",27,38,39],["报价波动",23,72,34],["官方渠道",20,30,67],["小摊回收",18,73,72],["卖不卖",20,23,50],["数据残留",18,55,82],["旧手机",22,57,55],["回收差别",17,82,54]],
    redbook: [["验机",28,42,43],["邮寄",22,72,32],["估价",25,64,60],["擦除数据",20,30,72],["闲置平板",18,29,25],["几十元",21,78,79],["步骤",17,21,55],["经验帖",18,84,52]],
    bilibili: [["拆机",31,45,43],["维修",26,76,34],["翻新",23,25,78],["主板",20,66,72],["电池",22,28,29],["屏幕",19,52,84],["金属",18,84,56],["看见物质",17,20,57]],
    weibo: [["以旧换新",25,43,44],["绿色回收",23,75,34],["电子垃圾",27,56,62],["消费节点",18,26,73],["平台活动",18,78,80],["政策",21,21,27],["责任",22,36,84],["热度",17,84,55]]
  };
  document.querySelectorAll(".platform-cloud").forEach(el => {
    const words = platformClouds[el.dataset.platform] || platformClouds.zhihu;
    el.querySelectorAll(".platform-cloud-word").forEach(node => node.remove());
    words.forEach(([text, size, x, y], i) => {
      const span = document.createElement("span");
      span.className = "platform-cloud-word";
      span.textContent = text;
      span.style.fontSize = `${size}px`;
      span.style.left = `${x}%`;
      span.style.top = `${y}%`;
      span.style.transitionDelay = `${i * 38}ms`;
      el.appendChild(span);
    });
  });
}
function drawHundredGrid() {
  const grid = document.getElementById("hundredGrid");
  if (!grid) return;
  grid.innerHTML = "";
  for (let i = 0; i < 100; i += 1) {
    const s = document.createElement("span");
    if (i < 16) s.className = "formal";
    s.style.transitionDelay = `${i * 8}ms`;
    grid.appendChild(s);
  }
}

function drawGapFlow() {
  const c = document.getElementById("gapFlowChart");
  if (!c) return;
  const svg = svgEl("svg", { viewBox: "0 0 780 410" });
  const nodes = [
    ["旧设备离开用户", 62, 180, "#101413", "#fff"],
    ["闲置", 304, 70, "#fff", "#101413"],
    ["二手/维修", 304, 150, "#fff", "#101413"],
    ["正规回收", 304, 230, "#c8f000", "#101413"],
    ["未记录去向", 304, 310, "#ffae00", "#101413"],
    ["能否追踪", 594, 200, "#101413", "#fff"]
  ];
  nodes.forEach(([text, x, y, fill, color]) => {
    svg.appendChild(svgEl("rect", { x, y, width: 150, height: 50, fill, stroke: "#101413" }));
    const tx = svgEl("text", { x: x + 75, y: y + 31, "text-anchor": "middle", fill: color, "font-size": 15, "font-weight": 900 });
    tx.textContent = text;
    svg.appendChild(tx);
  });
  [[212,205,304,95],[212,205,304,175],[212,205,304,255],[212,205,304,335],[454,95,594,225],[454,175,594,225],[454,255,594,225],[454,335,594,225]].forEach(([x1,y1,x2,y2], i) => {
    svg.appendChild(svgEl("line", { class: "flow-line", x1, y1, x2, y2, stroke: i === 6 ? "#c8f000" : "#ffae00", "stroke-width": 4, "stroke-linecap": "round" }));
  });
  addSource(svg, 62, 392, "示意图：根据正式收集与非正式去向问题整理");
  c.replaceChildren(svg);
}

function drawRouteFlow() {
  const c = document.getElementById("routeFlowChart");
  if (!c) return;
  const svg = svgEl("svg", { viewBox: "0 0 780 480" });
  const items = [
    ["旧设备", 42, 212, "#101413", "#fff"],
    ["闲置", 260, 60, "#dfe5df", "#101413"],
    ["二手流通", 260, 160, "#c8f000", "#101413"],
    ["正规回收", 260, 260, "#5f8792", "#fff"],
    ["非正规处理", 260, 360, "#ffae00", "#101413"],
    ["延寿/材料回收", 545, 172, "#c8f000", "#101413"],
    ["统计之外的风险", 545, 334, "#ffae00", "#101413"]
  ];
  items.forEach(([text, x, y, fill, color]) => {
    svg.appendChild(svgEl("rect", { x, y, width: 170, height: 58, fill, stroke: "#101413" }));
    const tx = svgEl("text", { x: x + 85, y: y + 36, "text-anchor": "middle", fill: color, "font-size": 15, "font-weight": 900 });
    tx.textContent = text;
    svg.appendChild(tx);
  });
  [[212,241,260,89],[212,241,260,189],[212,241,260,289],[212,241,260,389],[430,189,545,201],[430,289,545,201],[430,389,545,363]].forEach(([x1,y1,x2,y2], i) => {
    svg.appendChild(svgEl("line", { class: "flow-line", x1, y1, x2, y2, stroke: i > 5 ? "#ffae00" : "#101413", "stroke-width": 4, "stroke-linecap": "round" }));
  });
  c.replaceChildren(svg);
}

function setupRoutes() {
  const box = document.getElementById("routeBox");
  const visual = document.querySelector(".route-visual b");
  if (!box || !visual) return;
  document.querySelectorAll(".route-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".route-tab").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const copy = routeCopy[btn.dataset.route];
      box.innerHTML = `<h3>${copy.title}</h3><p>${copy.text}</p>`;
      visual.textContent = copy.label;
    });
  });
}

function setupToolbar() {
  document.querySelectorAll("[data-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-mode]").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      drawCountryChart(btn.dataset.mode);
    });
  });
  document.querySelectorAll("[data-year]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-year]").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      drawProductionChart(btn.dataset.year);
    });
  });
}

function setupImageCompare() {
  document.querySelectorAll("[data-compare]").forEach(box => {
    const target = box.closest(".hero") || box;
    const setSplit = clientX => {
      const rect = box.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, (clientX - rect.left) / rect.width * 100));
      box.style.setProperty("--split", `${pct}%`);
    };
    target.addEventListener("pointermove", event => setSplit(event.clientX));
    target.addEventListener("pointerdown", event => {
      target.setPointerCapture?.(event.pointerId);
      setSplit(event.clientX);
    });
  });
}
function markCurrentNav() {
  const file = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach(link => {
    if (link.getAttribute("href") === file) link.classList.add("is-current");
  });
}

function drawAllCharts() {
  drawGlobalTimeline();
  drawGlobalCollectionMini();
  drawGlobalGauge();
  drawCountryChart("total");
  drawProductionChart("2024");
  drawDigitalUsersChart();
  drawMarketVsWaste();
  drawChinaTrend();
  drawGapStack();
  drawHundredGrid();
  drawGapFlow();
  setupRadar();
  drawWordCloud();
  drawGlobalDistributionMap();
  drawPlatformClouds();
  drawRouteFlow();
}

function init() {
  markCurrentNav();
  setupImageCompare();
  updateProgress();
  updateCompareOnScroll();
  updateTimer();
  if (document.getElementById("wasteSinceOpen")) setInterval(updateTimer, 1000);
  drawAllCharts();
  setupToolbar();
  setupRoutes();
  setupObservers();
  window.addEventListener("scroll", () => {
    updateProgress();
    updateCompareOnScroll();
  }, { passive: true });
}

window.addEventListener("DOMContentLoaded", init);
