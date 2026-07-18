const KG_PER_SECOND = 62000000000 / (365 * 24 * 60 * 60);
const startTime = Date.now();

const countryData = [
  { country: "中国", total: 1206.6, perCapita: 8.5, rate: 16, market: 2417.4, collected: 195.2 },
  { country: "美国", total: 718.8, perCapita: 21.3, rate: 56, market: 918.5, collected: 405.4 },
  { country: "印度", total: 413.7, perCapita: 2.9, rate: 1, market: 1027.1, collected: 6.0 },
  { country: "日本", total: 263.8, perCapita: 21.2, rate: 23, market: 375.0, collected: 61.3 },
  { country: "巴西", total: 244.3, perCapita: 11.4, rate: 3, market: 321.0, collected: 7.9 },
  { country: "俄罗斯", total: 191.0, perCapita: 13.2 },
  { country: "印度尼西亚", total: 188.6, perCapita: 6.9 },
  { country: "德国", total: 176.7, perCapita: 21.2, rate: 54, market: 175.6, collected: 95.7 },
  { country: "英国", total: 165.2, perCapita: 24.5, rate: 30, market: 159.4, collected: 50.2 },
  { country: "墨西哥", total: 149.9, perCapita: 11.8 },
  { country: "法国", total: 144.5, perCapita: 22.4, rate: 60, market: 166.7, collected: 86.1 },
  { country: "意大利", total: 112.3, perCapita: 19.0 },
  { country: "韩国", total: 93.0, perCapita: 17.9 },
  { country: "加拿大", total: 77.4, perCapita: 20.2 },
  { country: "澳大利亚", total: 58.3, perCapita: 22.4 },
  { country: "阿根廷", total: 51.7, perCapita: 11.4 }
];

const countryMapLocations = {
  "中国": { lon: 104, lat: 35, dx: 54, dy: 49 },
  "美国": { lon: -100, lat: 38, dx: -56, dy: 47 },
  "印度": { lon: 78, lat: 22, dx: 54, dy: 52 },
  "日本": { lon: 138, lat: 37, dx: 48, dy: -31 },
  "巴西": { lon: -52, lat: -10, dx: -58, dy: 51 },
  "俄罗斯": { lon: 88, lat: 60, dx: 52, dy: -35 },
  "印度尼西亚": { lon: 118, lat: -2, dx: 50, dy: 48 },
  "德国": { lon: 10, lat: 51, dx: 72, dy: -34 },
  "英国": { lon: -3, lat: 55, dx: -69, dy: -34 },
  "墨西哥": { lon: -102, lat: 23, dx: -58, dy: 54 },
  "法国": { lon: 2, lat: 46, dx: -72, dy: 42 },
  "意大利": { lon: 12, lat: 42, dx: 65, dy: 50 },
  "韩国": { lon: 128, lat: 36, dx: -48, dy: -43 },
  "加拿大": { lon: -106, lat: 56, dx: -58, dy: -40 },
  "澳大利亚": { lon: 134, lat: -25, dx: 49, dy: 49 },
  "阿根廷": { lon: -64, lat: -34, dx: -56, dy: 43 }
};

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

async function drawCountryMap(mode = "total") {
  const container = document.getElementById("countryMap");
  if (!container) return;
  const title = document.getElementById("countryMapTitle");
  const width = 1100;
  const height = 540;
  const unit = mode === "total" ? "万吨" : "千克/人";
  if (title) title.textContent = mode === "total" ? "电子废弃物产生总量" : "人均电子废弃物产生量";
  container.classList.remove("is-ready");
  const svg = svgEl("svg", { viewBox: `0 0 ${width} ${height}`, "aria-hidden": "true" });
  const project = ([lon, lat]) => [((lon + 180) / 360) * width, ((90 - lat) / 180) * height];

  for (let lon = -150; lon <= 150; lon += 30) {
    const [x] = project([lon, 0]);
    svg.appendChild(svgEl("line", { class: "china-map-graticule", x1: x, y1: 0, x2: x, y2: height }));
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    const [, y] = project([0, lat]);
    svg.appendChild(svgEl("line", { class: "china-map-graticule", x1: 0, y1: y, x2: width, y2: y }));
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
      svg.appendChild(svgEl("path", { class: `china-map-country${focus ? " is-china" : ""}`, d }));
    });
  } catch (error) {
    const fallback = svgEl("text", { x: width / 2, y: height / 2, "text-anchor": "middle", fill: "#65716d", "font-size": 22 });
    fallback.textContent = "地图数据暂时未能载入";
    svg.appendChild(fallback);
  }

  const values = countryData.map(item => item[mode]);
  const max = Math.max(...values);
  countryData.forEach((item, index) => {
    const location = countryMapLocations[item.country];
    if (!location) return;
    const [x, y] = project([location.lon, location.lat]);
    const radius = (mode === "total" ? 8 : 7) + Math.sqrt(item[mode] / max) * (mode === "total" ? 22 : 19);
    const labelX = x + location.dx;
    const labelY = y + location.dy;
    const anchor = location.dx < 0 ? "end" : "start";
    const lineEndX = labelX + (location.dx < 0 ? 10 : -10);
    const group = svgEl("g", {
      class: `china-map-marker${item.country === "中国" ? " is-china" : ""}`,
      style: `--map-delay:${.12 + index * .07}s`
    });
    group.appendChild(svgEl("line", { class: "china-map-leader", x1: x, y1: y, x2: lineEndX, y2: labelY - 5 }));
    const bubble = svgEl("circle", { class: "china-map-bubble", cx: x, cy: y, r: radius });
    const tooltip = svgEl("title");
    tooltip.textContent = `${item.country}：${formatNumber(item[mode], 1)} ${unit}`;
    bubble.appendChild(tooltip);
    group.appendChild(bubble);
    const country = svgEl("text", { class: "china-map-label", x: labelX, y: labelY - 10, "text-anchor": anchor });
    country.textContent = item.country;
    const value = svgEl("text", { class: "china-map-value", x: labelX, y: labelY + 15, "text-anchor": anchor });
    value.textContent = `${formatNumber(item[mode], 1)} ${unit}`;
    group.append(country, value);
    svg.appendChild(group);
  });
  container.replaceChildren(svg);
  container.classList.remove("is-ready");
  window.setTimeout(() => {
    if (matchMedia("(max-width: 620px)").matches) {
      container.scrollLeft = Math.max(0, container.scrollWidth - container.clientWidth - 30);
    }
    container.classList.add("is-ready");
  }, 90);
}

function drawProductionDashboard(year = "2024") {
  const container = document.getElementById("productionDashboard");
  if (!container) return;
  const current = productionData[year];
  const baseline = productionData["2023"];
  const latest = productionData["2024"];
  const sum = data => data.reduce((total, item) => total + item.value, 0);
  const currentTotal = sum(current);
  const baselineTotal = sum(baseline);
  const latestTotal = sum(latest);
  const totalGrowth = (latestTotal / baselineTotal - 1) * 100;
  const maxOutput = Math.max(...current.map(item => item.value));
  const growth = latest.map((item, index) => ({
    label: item.label,
    value: (item.value / baseline[index].value - 1) * 100,
    color: item.color
  }));
  const maxGrowth = Math.max(...growth.map(item => item.value));
  const shares = current.map(item => ({ ...item, share: item.value / currentTotal * 100 }));
  let stop = 0;
  const donutStops = shares.map(item => {
    const start = stop;
    stop += item.share;
    return `${item.color} ${start.toFixed(2)}% ${stop.toFixed(2)}%`;
  }).join(",");
  const selectedGrowth = year === "2024" ? totalGrowth : null;
  const phone = current[0];
  const computer = current[1];
  const outputRows = current.map(item => `
    <div class="production-output-row">
      <span>${item.label}</span>
      <div><i class="production-output-fill" style="--bar:${(item.value / maxOutput * 100).toFixed(2)}%;--color:${item.color}"></i></div>
      <b>${formatNumber(item.value, 1)}</b>
    </div>`).join("");
  const growthRows = growth.map(item => `
    <div class="production-growth-row">
      <span>${item.label.replace("移动通信手持机", "手机").replace("微型计算机设备", "计算机").replace("房间空气调节器", "空调").replace("彩色电视机", "电视").replace("家用电冰箱", "冰箱")}</span>
      <div><i style="--bar:${(item.value / maxGrowth * 100).toFixed(2)}%;--color:${item.color}"></i></div>
      <b>+${formatNumber(item.value, 1)}%</b>
    </div>`).join("");
  const shareLegend = shares.map(item => `
    <li><i style="--color:${item.color}"></i><span>${item.label.replace("移动通信手持机", "手机").replace("微型计算机设备", "计算机").replace("房间空气调节器", "空调").replace("彩色电视机", "电视").replace("家用电冰箱", "冰箱")}</span><b>${formatNumber(item.share, 1)}%</b></li>`).join("");
  const comparisonMax = Math.max(baselineTotal, latestTotal);
  container.classList.remove("is-ready");
  container.innerHTML = `
    <div class="production-dashboard-grid">
      <section class="production-panel production-panel--overview">
        <span class="production-panel-kicker">五类产品合计</span>
        <div class="production-big-number"><strong data-count="${currentTotal}" data-decimals="1">0.0</strong><em>万台</em></div>
        <p>${year === "2024" ? `较 2023 年增长 <b>+${formatNumber(selectedGrowth, 1)}%</b>` : "作为 2024 年同比计算的基准年"}</p>
      </section>
      <section class="production-panel production-panel--kpi">
        <span class="production-panel-kicker">移动通信手持机</span>
        <strong data-count="${phone.value}" data-decimals="1">0.0</strong>
        <small>万台 / 占五类总量 ${formatNumber(phone.value / currentTotal * 100, 1)}%</small>
      </section>
      <section class="production-panel production-panel--kpi production-panel--computer">
        <span class="production-panel-kicker">微型计算机设备</span>
        <strong data-count="${computer.value}" data-decimals="1">0.0</strong>
        <small>万台 / 占五类总量 ${formatNumber(computer.value / currentTotal * 100, 1)}%</small>
      </section>
      <section class="production-panel production-panel--output">
        <header><h3>${year} 年主要产品产量</h3><span>单位：万台</span></header>
        <div class="production-output-bars">${outputRows}</div>
      </section>
      <section class="production-panel production-panel--growth">
        <header><h3>2024 年同比增幅</h3><span>对照 2023 年</span></header>
        <div class="production-growth-bars">${growthRows}</div>
      </section>
      <section class="production-panel production-panel--share">
        <header><h3>${year} 年产品结构</h3><span>五类合计 = 100%</span></header>
        <div class="production-share-layout">
          <div class="production-donut" style="background:conic-gradient(${donutStops})"><span><b>${year}</b>结构</span></div>
          <ul>${shareLegend}</ul>
        </div>
      </section>
      <section class="production-panel production-panel--compare">
        <header><h3>两年之间，多出多少设备？</h3><span>五类产品合计</span></header>
        <div class="production-compare-layout">
          <div class="production-compare-bars">
            <div class="${year === "2023" ? "is-selected" : ""}"><b style="--height:${(baselineTotal / comparisonMax * 100).toFixed(2)}%"></b><span>2023</span><em>${formatNumber(baselineTotal, 1)}</em></div>
            <div class="${year === "2024" ? "is-selected" : ""}"><b style="--height:${(latestTotal / comparisonMax * 100).toFixed(2)}%"></b><span>2024</span><em>${formatNumber(latestTotal, 1)}</em></div>
          </div>
          <div class="production-gain"><span>一年净增</span><strong>+${formatNumber(latestTotal - baselineTotal, 1)}</strong><em>万台</em><small>这不是当年废弃量，而是未来回收压力的新增入口。</small></div>
        </div>
      </section>
    </div>`;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    container.classList.add("is-ready");
    if (container.closest(".is-visible")) animateCounters(container);
  }));
}

function drawDigitalUsersChart() {
  const container = document.getElementById("digitalUsersChart");
  if (!container) return;
  const max = Math.max(...digitalUsers.map(item => item.value));
  const bars = digitalUsers.map((item, index) => `
    <div class="digital-scale-row" style="--delay:${index * 90}ms">
      <span>${item.label}</span>
      <i><b class="dash-fill" style="--bar:${(item.value / max * 100).toFixed(1)}%;--color:${item.color}"></b></i>
      <strong>${formatNumber(item.value, 2)}<em>亿</em></strong>
    </div>`).join("");
  const devices = [
    ["台式电脑", 36.2], ["笔记本电脑", 32.0], ["平板电脑", 30.8], ["可穿戴设备", 23.8]
  ].map(([label, value], index) => `
    <div class="digital-device-row" style="--delay:${420 + index * 70}ms">
      <span>${label}</span><i><b class="dash-fill" style="--bar:${value}%;--color:${index % 2 ? "#5f8792" : "#ffae00"}"></b></i><strong>${value}%</strong>
    </div>`).join("");
  container.innerHTML = `
    <div class="china-mini-dashboard digital-access-dashboard">
      <header class="china-dash-head">
        <div><span>DIGITAL ACCESS / 2024</span><h3>数字生活前端监测</h3></div>
        <b>连接规模不是人口加总</b>
      </header>
      <div class="digital-kpi-grid">
        ${digitalUsers.map((item, index) => `<div class="digital-kpi" style="--accent:${item.color};--delay:${index * 70}ms"><span>${item.label}</span><strong data-count="${item.value}" data-decimals="2">0.00</strong><em>亿</em></div>`).join("")}
      </div>
      <div class="digital-dashboard-grid">
        <section class="china-dash-module digital-scale-module">
          <header><h4>接入规模</h4><span>单位：亿户／亿人</span></header>
          <div class="digital-scale-bars">${bars}</div>
        </section>
        <section class="china-dash-module digital-gauge-module">
          <header><h4>两种普及速度</h4><span>占比</span></header>
          <div class="digital-gauges">
            <div class="china-ring" style="--value:56.7;--ring:#c8f000"><span><b data-count="56.7" data-decimals="1">0.0</b><em>%</em><small>5G用户占移动电话用户</small></span></div>
            <div class="china-ring" style="--value:78.6;--ring:#ffae00"><span><b data-count="78.6" data-decimals="1">0.0</b><em>%</em><small>互联网普及率</small></span></div>
          </div>
        </section>
      </div>
      <section class="china-dash-module digital-device-module">
        <header><h4>网民使用不同设备上网的比例</h4><span>同一人可使用多种设备</span></header>
        <div class="digital-device-bars">${devices}</div>
      </section>
      <p class="china-dash-source">数据来源：工业和信息化部《2024年通信业统计公报》；中国互联网络信息中心第55次《中国互联网络发展状况统计报告》。</p>
    </div>`;
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
  const container = document.getElementById("marketVsWasteChart");
  if (!container) return;
  const market = 2417.4;
  const generated = 1206.6;
  const collected = 195.2;
  const unrecorded = generated - collected;
  const generatedRatio = generated / market * 100;
  const collectedRatio = collected / generated * 100;
  const globeDots = [
    [85,83],[96,77],[108,81],[119,92],[112,105],[98,110],[88,101],[80,116],[90,129],[103,137],
    [187,73],[201,70],[214,78],[228,83],[241,94],[231,105],[215,102],[205,111],[193,121],[184,134],
    [198,145],[211,151],[217,164],[209,178],[198,187],[190,174],[183,158],[225,132],[239,126],[249,137],
    [162,67],[151,78],[145,94],[152,108],[165,116],[173,102],[170,85],[133,142],[142,154],[154,163],
    [165,174],[174,186],[181,200],[169,214],[156,205],[145,191],[118,169],[109,181],[99,194],[91,183]
  ].map(([x, y], index) => `<circle cx="${x}" cy="${y}" r="${index % 5 === 0 ? 2.5 : 1.7}"></circle>`).join("");
  container.innerHTML = `
    <div class="market-monitor">
      <header class="market-monitor-head">
        <div><span>MATERIAL FLOW / CHINA 2022</span><h3>设备流入与正式收集监测台</h3></div>
        <b>单位：万吨</b>
      </header>
      <div class="market-kpi-grid">
        <div class="market-kpi market-kpi--green"><span>进入市场</span><strong data-count="${market}" data-decimals="1">0.0</strong><em>万吨</em><small>当年投放市场的电子电气设备</small></div>
        <div class="market-kpi market-kpi--orange"><span>形成废弃物</span><strong data-count="${generated}" data-decimals="1">0.0</strong><em>万吨</em><small>当年产生的电子废弃物</small></div>
        <div class="market-kpi market-kpi--steel"><span>正式收集</span><strong data-count="${collected}" data-decimals="1">0.0</strong><em>万吨</em><small>进入正式记录的部分</small></div>
      </div>
      <div class="market-monitor-grid">
        <section class="market-monitor-module market-ledger-module">
          <header><h4>链条账本</h4><span>三个入口，两个比率</span></header>
          <div class="market-ledger-row"><span>市场投入 → 当年废弃</span><i><b class="dash-fill" style="--bar:${generatedRatio.toFixed(1)}%;--color:#ffae00"></b></i><strong>${generatedRatio.toFixed(1)}%</strong></div>
          <div class="market-ledger-row"><span>当年废弃 → 正式收集</span><i><b class="dash-fill" style="--bar:${collectedRatio.toFixed(1)}%;--color:#c8f000"></b></i><strong>${collectedRatio.toFixed(1)}%</strong></div>
          <div class="market-gap-number"><span>未进入正式收集记录</span><strong data-count="${unrecorded}" data-decimals="1">0.0</strong><em>万吨</em></div>
        </section>
        <section class="market-flow-core" aria-label="透明数字地球呈现设备流入、废弃和正式收集的转化关系">
          <div class="market-globe-scene" tabindex="0" aria-label="可拖动旋转的电子设备流向地球">
            <div class="market-globe-orbit market-globe-orbit--a"></div>
            <div class="market-globe-orbit market-globe-orbit--b"></div>
            <svg class="market-globe" viewBox="0 0 300 300" aria-hidden="true">
              <defs>
                <radialGradient id="marketGlobeGlass" cx="36%" cy="28%" r="72%"><stop offset="0" stop-color="#d9fbff" stop-opacity=".32"></stop><stop offset=".38" stop-color="#3fc5df" stop-opacity=".16"></stop><stop offset="1" stop-color="#071a20" stop-opacity=".62"></stop></radialGradient>
                <linearGradient id="marketGlobeEdge" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#9feeff"></stop><stop offset=".48" stop-color="#3ca6c3"></stop><stop offset="1" stop-color="#c8f000"></stop></linearGradient>
                <clipPath id="marketGlobeClip"><circle cx="150" cy="150" r="112"></circle></clipPath>
              </defs>
              <circle class="market-globe-glass" cx="150" cy="150" r="112" fill="url(#marketGlobeGlass)" stroke="url(#marketGlobeEdge)" stroke-width="2"></circle>
              <g class="market-globe-grid" clip-path="url(#marketGlobeClip)">
                <ellipse cx="150" cy="150" rx="108" ry="34"></ellipse><ellipse cx="150" cy="116" rx="98" ry="27"></ellipse><ellipse cx="150" cy="184" rx="98" ry="27"></ellipse>
                <ellipse cx="150" cy="150" rx="44" ry="109"></ellipse><ellipse cx="150" cy="150" rx="78" ry="109"></ellipse>
                <path d="M57 112C78 84 109 66 150 62C196 58 233 78 253 108"></path><path d="M50 193C84 219 118 231 151 232C193 233 229 215 251 190"></path>
              </g>
              <g class="market-globe-land" clip-path="url(#marketGlobeClip)">
                <path d="M70 82L94 70L119 78L128 94L114 106L100 104L93 121L79 132L68 117L56 106Z"></path>
                <path d="M96 132L115 138L126 156L117 175L109 199L94 213L86 194L89 169L80 151Z"></path>
                <path d="M164 72L188 64L216 72L244 88L236 104L218 106L207 121L184 116L173 101L153 96Z"></path>
                <path d="M178 118L203 126L215 147L205 174L192 199L177 183L169 157L157 139Z"></path>
                <path d="M221 186L240 181L253 195L241 207L222 204L213 194Z"></path>
              </g>
              <g class="market-globe-dots" clip-path="url(#marketGlobeClip)">${globeDots}</g>
              <path class="market-globe-scan" d="M50 150C91 176 211 176 250 150"></path>
            </svg>
            <div class="market-globe-value"><span>当年废弃量约为市场投入量的</span><strong data-count="${generatedRatio}" data-decimals="1">0.0</strong><em>%</em></div>
            <div class="market-globe-base"><i></i><b></b><span></span></div>
          </div>
        </section>
        <section class="market-monitor-module market-ratio-module">
          <header><h4>末端可见度</h4><span>正式记录／产生量</span></header>
          <div class="market-ratio-layout">
            <div class="china-ring china-ring--large" style="--value:${collectedRatio.toFixed(1)};--ring:#c8f000"><span><b data-count="${collectedRatio}" data-decimals="1">0.0</b><em>%</em><small>被正式收集</small></span></div>
            <div class="market-ratio-copy"><span>仍在正式记录之外</span><strong data-count="${(100 - collectedRatio)}" data-decimals="1">0.0</strong><em>%</em><small>可能闲置、转卖、维修，也可能进入非正规拆解链。</small></div>
          </div>
        </section>
      </div>
      <div class="market-stage-strip">
        <div><i>01</i><span>进入市场</span><strong>2417.4</strong></div>
        <b aria-hidden="true"></b>
        <div><i>02</i><span>成为废弃物</span><strong>1206.6</strong></div>
        <b aria-hidden="true"></b>
        <div><i>03</i><span>正式收集</span><strong>195.2</strong></div>
      </div>
      <p class="market-monitor-source">数据来源：全球电子废弃物统计伙伴关系（Global E-waste Statistics Partnership）China 2022 country sheet；比例与缺口据原始值计算。</p>
    </div>`;
  setupMarketGlobeInteraction(container.querySelector(".market-globe-scene"));
}

function setupMarketGlobeInteraction(scene) {
  if (!scene || scene.dataset.orbitsReady) return;
  scene.dataset.orbitsReady = "true";
  const orbitA = scene.querySelector(".market-globe-orbit--a");
  const orbitB = scene.querySelector(".market-globe-orbit--b");
  if (!orbitA || !orbitB) return;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let angleA = -12;
  let angleB = 18;
  let squashA = 1;
  let squashB = 1;
  let dragging = false;
  let pointerX = 0;
  let pointerY = 0;

  const applyOrbitTransforms = () => {
    orbitA.style.transform = `translateX(-50%) rotate(${angleA}deg) scaleY(${squashA})`;
    orbitB.style.transform = `translateX(-50%) rotate(${angleB}deg) scaleY(${squashB})`;
  };
  const render = () => {
    if (!dragging && !reduceMotion) {
      angleA += .08;
      angleB -= .065;
    }
    applyOrbitTransforms();
    if (scene.isConnected) requestAnimationFrame(render);
  };

  scene.addEventListener("pointerdown", event => {
    dragging = true;
    pointerX = event.clientX;
    pointerY = event.clientY;
    scene.classList.add("is-dragging");
    try { scene.setPointerCapture?.(event.pointerId); } catch {}
  });
  scene.addEventListener("pointermove", event => {
    if (!dragging) return;
    const dx = event.clientX - pointerX;
    const dy = event.clientY - pointerY;
    angleA += dx * .32;
    angleB -= dx * .26;
    squashA = Math.max(.68, Math.min(1.18, squashA + dy * .004));
    squashB = Math.max(.68, Math.min(1.18, squashB - dy * .003));
    pointerX = event.clientX;
    pointerY = event.clientY;
    applyOrbitTransforms();
  });
  const release = event => {
    dragging = false;
    scene.classList.remove("is-dragging");
    try {
      if (scene.hasPointerCapture?.(event.pointerId)) scene.releasePointerCapture(event.pointerId);
    } catch {}
  };
  scene.addEventListener("pointerup", release);
  scene.addEventListener("pointercancel", release);
  scene.addEventListener("keydown", event => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const direction = ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1;
    angleA += direction * 8;
    angleB -= direction * 7;
    applyOrbitTransforms();
  });
  requestAnimationFrame(render);
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

function rosePoint(cx, cy, radius, angle) {
  const radians = (angle - 90) * Math.PI / 180;
  return [cx + radius * Math.cos(radians), cy + radius * Math.sin(radians)];
}

function roseSectorPath(cx, cy, innerRadius, outerRadius, startAngle, endAngle) {
  const [outerStartX, outerStartY] = rosePoint(cx, cy, outerRadius, endAngle);
  const [outerEndX, outerEndY] = rosePoint(cx, cy, outerRadius, startAngle);
  const [innerStartX, innerStartY] = rosePoint(cx, cy, innerRadius, startAngle);
  const [innerEndX, innerEndY] = rosePoint(cx, cy, innerRadius, endAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${outerStartX} ${outerStartY} A ${outerRadius} ${outerRadius} 0 ${largeArc} 0 ${outerEndX} ${outerEndY} L ${innerStartX} ${innerStartY} A ${innerRadius} ${innerRadius} 0 ${largeArc} 1 ${innerEndX} ${innerEndY} Z`;
}

function drawPressureDashboard() {
  const container = document.getElementById("radarChart");
  if (!container) return;
  const countries = [
    { name: "中国", total: 1206.6, perCapita: 8.5, collected: 195.2 },
    { name: "美国", total: 718.8, perCapita: 21.3, collected: 405.4 },
    { name: "印度", total: 413.7, perCapita: 2.9, collected: 6.0 }
  ].map(item => ({ ...item, rate: item.collected / item.total * 100 }));
  const metrics = [
    { key: "total", label: "产生总量", unit: "万吨", color: "#ffae00" },
    { key: "perCapita", label: "人均产生量", unit: "千克／人", color: "#5f8792" },
    { key: "rate", label: "正式收集率", unit: "%", color: "#c8f000" }
  ];
  const metricMax = Object.fromEntries(metrics.map(metric => [metric.key, Math.max(...countries.map(item => item[metric.key]))]));
  const wedges = countries.flatMap((country, countryIndex) => metrics.map((metric, metricIndex) => {
    const index = countryIndex * metrics.length + metricIndex;
    const normalized = country[metric.key] / metricMax[metric.key];
    const outerRadius = 42 + Math.sqrt(normalized) * 130;
    const startAngle = -110 + index * 40 + 4;
    const endAngle = startAngle + 32;
    return `<path class="rose-wedge" style="--delay:${index * 75}ms" d="${roseSectorPath(210, 192, 29, outerRadius, startAngle, endAngle)}" fill="${metric.color}"><title>${country.name} · ${metric.label}：${formatNumber(country[metric.key], 1)} ${metric.unit}</title></path>`;
  })).join("");
  const countryLabels = [
    { name: "中国", angle: -50 }, { name: "美国", angle: 70 }, { name: "印度", angle: 190 }
  ].map(item => {
    const [x, y] = rosePoint(210, 192, 190, item.angle);
    return `<text x="${x}" y="${y}" text-anchor="middle">${item.name}</text>`;
  }).join("");
  const countryBriefs = countries.map((country, index) => `
    <article class="pressure-country-brief" style="--delay:${index * 100}ms">
      <header><span>0${index + 1}</span><strong>${country.name}</strong></header>
      <div><span>总量<b>${formatNumber(country.total, 1)}</b><em>万吨</em></span><span>人均<b>${formatNumber(country.perCapita, 1)}</b><em>千克</em></span><span>收集<b>${formatNumber(country.rate, 1)}</b><em>%</em></span></div>
    </article>`).join("");
  container.innerHTML = `
    <div class="china-mini-dashboard pressure-dashboard">
      <header class="china-dash-head">
        <div><span>NIGHTINGALE ROSE / THREE PRESSURES</span><h3>尺度一换，排名就会重新洗牌</h3></div>
        <b>2024</b>
      </header>
      <div class="pressure-rose-layout">
        <figure class="pressure-rose-figure">
          <svg viewBox="0 0 420 390" role="img" aria-label="中美印三国总量、人均量和正式收集率归一化玫瑰图">
            <g class="rose-guides"><circle cx="210" cy="192" r="76"></circle><circle cx="210" cy="192" r="124"></circle><circle cx="210" cy="192" r="168"></circle></g>
            <g class="rose-wedges">${wedges}</g>
            <circle class="rose-core" cx="210" cy="192" r="27"></circle>
            <g class="rose-country-labels">${countryLabels}</g>
          </svg>
          <figcaption>花瓣面积按每项指标的组内最高值归一化；不同颜色代表不同指标。</figcaption>
        </figure>
        <div class="pressure-rose-side">
          <div class="pressure-rose-legend">${metrics.map(metric => `<span><i style="--color:${metric.color}"></i>${metric.label}</span>`).join("")}</div>
          <div class="pressure-country-briefs">${countryBriefs}</div>
        </div>
      </div>
      <p class="china-dash-source">数据来源：全球电子废弃物统计伙伴关系（Global E-waste Statistics Partnership）2022 country sheets；正式收集率由正式收集量除以产生量计算。</p>
    </div>`;
}

function setupRadar() {
  drawPressureDashboard();
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
    const bubbleRadius = Math.max(region.r, 24 + region.value.length * 3.5);
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
      drawCountryMap(btn.dataset.mode);
    });
  });
  document.querySelectorAll("[data-year]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-year]").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      drawProductionDashboard(btn.dataset.year);
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
  drawCountryMap("total");
  drawProductionDashboard("2024");
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
