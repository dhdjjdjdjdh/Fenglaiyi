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
  { year: 2022, generated: 1206.6, collected: 195.2 },
  { year: 2023, generated: 1269.3, collected: 205.4, estimated: true },
  { year: 2024, generated: 1332.0, collected: 215.5, estimated: true },
  { year: 2025, generated: 1394.7, collected: 225.7, estimated: true }
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
  const c = document.getElementById("gapStackChart");
  if (!c) return;
  const gaps = chinaTrend.map(item => ({ ...item, gap: item.generated - item.collected }));
  const first = gaps[0];
  const last = gaps[gaps.length - 1];
  const averageRise = (last.gap - first.gap) / (gaps.length - 1);
  const maxGap = Math.max(...gaps.map(item => item.gap));
  const maxGenerated = Math.max(...gaps.map(item => item.generated));
  const annualIncreases = gaps.slice(1).map((item, index) => ({
    ...item,
    increase: item.gap - gaps[index].gap
  }));
  const maxIncrease = Math.max(...annualIncreases.map(item => item.increase));
  const points = gaps.map((item, index) => {
    const x = 34 + index * (572 / (gaps.length - 1));
    const y = 222 - item.gap / maxGap * 152;
    return { ...item, x, y };
  });
  const line = points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const area = `${line} L606 222 L34 222 Z`;

  c.innerHTML = `
    <div class="gap-dash-head">
      <div><span>THE MISSING MAJORITY</span><h3>缺口不是静止库存，而是一条继续抬升的曲线</h3></div>
      <small>2023—2025 为趋势外推</small>
    </div>
    <div class="gap-kpi-row">
      <div><span>2025 估算缺口</span><strong>${last.gap.toFixed(1)}</strong><small>万吨</small></div>
      <div><span>七年增加</span><strong>${(last.gap - first.gap).toFixed(1)}</strong><small>万吨</small></div>
      <div><span>2025 估算收集率</span><strong>${(last.collected / last.generated * 100).toFixed(3)}</strong><small>%</small></div>
      <div><span>年均缺口增量</span><strong>${averageRise.toFixed(1)}</strong><small>万吨</small></div>
    </div>
    <div class="gap-dash-grid">
      <section class="gap-trend-module">
        <header><b>缺口走势</b><span>单位：万吨</span></header>
        <svg viewBox="0 0 640 258" aria-label="2018年至2025年未进入正式收集的电子废弃物趋势">
          <defs><linearGradient id="gapArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffae00" stop-opacity=".58"/><stop offset="1" stop-color="#ffae00" stop-opacity=".02"/></linearGradient></defs>
          <path class="gap-area" d="${area}" fill="url(#gapArea)"></path>
          <path class="gap-line" d="${line}" fill="none" stroke="#ffae00" stroke-width="4"></path>
          ${points.map(point => `<g class="gap-point ${point.estimated ? "is-estimated" : ""}" tabindex="0"><circle cx="${point.x}" cy="${point.y}" r="6"></circle><text x="${point.x}" y="244" text-anchor="middle">${point.year}</text><title>${point.year} 年：缺口 ${point.gap.toFixed(1)} 万吨${point.estimated ? "（趋势外推）" : ""}</title></g>`).join("")}
          <line class="gap-estimate-divider" x1="401" y1="34" x2="401" y2="226"></line>
          <text class="gap-estimate-label" x="411" y="46">趋势外推</text>
        </svg>
      </section>
      <section class="gap-increase-module">
        <header><b>年度新增缺口</b><span>比上一年增加（万吨）</span></header>
        <div class="gap-increase-bars">
          ${annualIncreases.map(item => `
            <span class="${item.estimated ? "is-estimated" : ""}" title="${item.year} 年缺口比上一年增加 ${item.increase.toFixed(1)} 万吨${item.estimated ? "（趋势外推）" : ""}">
              <b>${item.increase.toFixed(1)}</b>
              <i style="--height:${(item.increase / maxIncrease * 100).toFixed(1)}%"></i>
              <em>${item.year}${item.estimated ? "*" : ""}</em>
            </span>`).join("")}
        </div>
      </section>
      <section class="gap-composition-module">
        <header><b>每年产生量的构成</b><span>整条长度＝当年产生量</span></header>
        <div class="gap-composition-legend"><span><i></i>正式收集</span><span><i></i>未正式收集</span></div>
        <div class="gap-composition-list">
          ${gaps.map(item => {
            const rate = item.collected / item.generated * 100;
            return `<div class="gap-composition-row ${item.estimated ? "is-estimated" : ""}" title="${item.year} 年：产生 ${item.generated.toFixed(1)} 万吨，正式收集 ${item.collected.toFixed(1)} 万吨，未正式收集 ${item.gap.toFixed(1)} 万吨${item.estimated ? "（趋势外推）" : ""}">
              <b>${item.year}${item.estimated ? "*" : ""}</b>
              <span class="gap-composition-base"><span class="gap-composition-track" style="--total:${(item.generated / maxGenerated * 100).toFixed(1)}%;--formal:${rate.toFixed(3)}%"><i></i><em></em></span></span>
              <strong>${rate.toFixed(3)}%</strong>
            </div>`;
          }).join("")}
        </div>
        <p>横条总长比较当年产生量；绿色段是正式收集，橙色段是未进入正式收集口径的重量。星号年份为趋势外推。</p>
      </section>
      <section class="gap-reading-module"><b>读图</b><p>产生量、正式收集量都在增加，但两者没有拉近。若既有增量关系延续，2025 年的未正式收集部分将比 2018 年多约 ${(last.gap - first.gap).toFixed(1)} 万吨。</p></section>
    </div>
    <p class="gap-dashboard-source">数据来源：全球电子废弃物统计伙伴关系（Global E-waste Statistics Partnership）China country sheets。2018—2022 为报告值；2023—2025 按 2018—2022 平均年增量外推，仅作趋势展示。</p>`;
}

function drawChinaTrend() {
  const c = document.getElementById("chinaTrendChart");
  if (!c) return;
  c.innerHTML = `
    <div class="gap-radial-head">
      <div><span>2018—2025 / EIGHT RINGS</span><h3>增长向外扩张，正式收集只占每一圈的一小段</h3></div>
      <div class="gap-radial-legend"><i></i>正式收集<b></b>未正式收集</div>
    </div>
    <div class="gap-radial-visual">
      <svg viewBox="0 0 520 520" aria-hidden="true"></svg>
      <div class="gap-radial-core" aria-live="polite"><small>2022</small><strong>16.2%</strong><span>正式收集率</span></div>
    </div>
    <div class="gap-year-key" aria-label="选择年份"></div>
    <div class="gap-radial-readout" aria-live="polite">
      <div><span>产生量</span><strong data-gap-generated>1206.6</strong><small>万吨</small></div>
      <div><span>正式收集</span><strong data-gap-collected>195.2</strong><small>万吨</small></div>
      <div><span>未正式收集</span><strong data-gap-missing>1011.4</strong><small>万吨</small></div>
    </div>
    <div class="gap-ring-explainer" aria-live="polite"><span data-gap-status>官方观测</span><strong data-gap-meaning>最外缘代表该年产生总量，绿色圆弧代表其中被正式收集的部分。</strong><p data-gap-detail>剩余的橙色圆弧并不等于全部污染，而是尚未进入同等完整正式收集记录的重量。</p></div>
    <p class="gap-chart-source">单位：万吨。数据来源：全球电子废弃物统计伙伴关系（Global E-waste Statistics Partnership）China country sheets。2018—2022 为报告值；2023—2025 按此前平均年增量外推，仅作趋势展示。</p>`;

  const svg = c.querySelector("svg");
  const key = c.querySelector(".gap-year-key");
  const core = c.querySelector(".gap-radial-core");
  const radii = [72, 93, 114, 135, 156, 177, 198, 219];
  const groups = [];
  const buttons = [];

  radii.forEach(radius => {
    svg.appendChild(svgEl("circle", { cx: 260, cy: 260, r: radius, fill: "none", stroke: "rgba(16,20,19,.06)", "stroke-width": 1 }));
  });

  const update = selected => {
    const rate = selected.collected / selected.generated * 100;
    const missing = selected.generated - selected.collected;
    groups.forEach(group => group.classList.toggle("is-active", Number(group.dataset.year) === selected.year));
    buttons.forEach(button => button.classList.toggle("is-active", Number(button.dataset.year) === selected.year));
    core.querySelector("small").textContent = selected.year;
    core.querySelector("strong").textContent = `${rate.toFixed(1)}%`;
    c.querySelector("[data-gap-generated]").textContent = selected.generated.toFixed(1);
    c.querySelector("[data-gap-collected]").textContent = selected.collected.toFixed(1);
    c.querySelector("[data-gap-missing]").textContent = missing.toFixed(1);
    c.querySelector("[data-gap-status]").textContent = selected.estimated ? "趋势外推" : "官方观测";
    c.querySelector("[data-gap-status]").classList.toggle("is-estimated", Boolean(selected.estimated));
    c.querySelector("[data-gap-meaning]").textContent = `${selected.year} 年这一圈：产生 ${selected.generated.toFixed(1)} 万吨，正式收集 ${selected.collected.toFixed(1)} 万吨。`;
    c.querySelector("[data-gap-detail]").textContent = selected.estimated
      ? `该圈按 2018—2022 年平均年增量外推，估算缺口为 ${missing.toFixed(1)} 万吨，不是官方发布的年度观测值。`
      : `橙色部分约 ${missing.toFixed(1)} 万吨，表示没有进入正式收集口径的重量，并不等同于全部非法处理。`;
  };

  chinaTrend.forEach((item, index) => {
    const rate = item.collected / item.generated * 100;
    const group = svgEl("g", {
      class: `gap-ring-group${item.estimated ? " is-estimated" : ""}`,
      tabindex: 0,
      role: "button",
      "data-year": item.year,
      "aria-label": `${item.year}年，产生量${item.generated.toFixed(1)}万吨，正式收集${item.collected.toFixed(1)}万吨${item.estimated ? "，趋势外推" : "，官方观测"}`
    });
    const radius = radii[index];
    const missing = svgEl("circle", {
      class: "gap-ring-missing",
      cx: 260, cy: 260, r: radius,
      fill: "none", stroke: "#ffae00", "stroke-width": 18,
      "pathLength": 100,
      transform: "rotate(-90 260 260)"
    });
    missing.style.opacity = String(.22 + index * .075);
    const formal = svgEl("circle", {
      class: "gap-ring-progress",
      cx: 260, cy: 260, r: radius,
      fill: "none", stroke: "#c8f000", "stroke-width": 18,
      "stroke-linecap": "butt", "pathLength": 100,
      "stroke-dasharray": `${rate.toFixed(2)} ${(100 - rate).toFixed(2)}`,
      transform: "rotate(-90 260 260)"
    });
    formal.style.setProperty("--ring-delay", `${index * 120 + 180}ms`);
    const hit = svgEl("circle", {
      class: "gap-ring-hit",
      cx: 260, cy: 260, r: radius,
      fill: "none", stroke: "transparent", "stroke-width": 25
    });
    group.append(missing, formal, hit);
    ["mouseenter", "focus", "click"].forEach(eventName => group.addEventListener(eventName, () => update(item)));
    svg.appendChild(group);
    groups.push(group);

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.year = item.year;
    button.textContent = item.estimated ? `${item.year}*` : item.year;
    button.title = `${item.year} 年正式收集率：${rate.toFixed(3)}%${item.estimated ? "（趋势外推）" : ""}`;
    if (item.estimated) button.classList.add("is-estimated");
    ["mouseenter", "focus", "click"].forEach(eventName => button.addEventListener(eventName, () => update(item)));
    key.appendChild(button);
    buttons.push(button);
  });
  update(chinaTrend[chinaTrend.length - 1]);
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

function setupRiskTransferBoard() {
  const board = document.getElementById("riskTransferBoard");
  if (!board) return;
  const stages = [...board.querySelectorAll(".risk-stage")];
  const infoValue = document.getElementById("riskInfoValue");
  const powerValue = document.getElementById("riskPowerValue");
  const exposureValue = document.getElementById("riskExposureValue");
  const infoMeter = document.getElementById("riskInfoMeter");
  const powerMeter = document.getElementById("riskPowerMeter");
  const exposureMeter = document.getElementById("riskExposureMeter");
  const stageNumber = document.getElementById("riskStageNumber");
  const stageTitle = document.getElementById("riskStageTitle");
  const stageSummary = document.getElementById("riskStageSummary");
  const stageLoss = document.getElementById("riskStageLoss");
  const coreHint = document.getElementById("riskCoreHint");
  const coreHints = ["仍与原主人相连", "流向由交易决定", "设备开始被拆开", "身份变成材料"];

  const activate = stage => {
    const index = Number(stage.dataset.index || 0);
    stages.forEach(item => item.classList.toggle("is-active", item === stage));
    infoValue.textContent = stage.dataset.info;
    powerValue.textContent = stage.dataset.power;
    exposureValue.textContent = stage.dataset.exposure;
    infoMeter.style.setProperty("--level", stage.dataset.infoLevel);
    powerMeter.style.setProperty("--level", stage.dataset.powerLevel);
    exposureMeter.style.setProperty("--level", stage.dataset.exposureLevel);
    stageNumber.textContent = `STAGE ${String(index + 1).padStart(2, "0")}`;
    stageTitle.textContent = stage.querySelector("b").textContent;
    stageSummary.textContent = stage.dataset.summary;
    stageLoss.textContent = stage.dataset.loss;
    coreHint.textContent = coreHints[index];
  };

  stages.forEach(stage => {
    ["mouseenter", "focus", "click"].forEach(eventName => stage.addEventListener(eventName, () => activate(stage)));
  });
  activate(stages[0]);
}

function setupCustodyLedger() {
  const ledger = document.getElementById("custodyLedger");
  if (!ledger) return;
  const stops = [...ledger.querySelectorAll(".custody-stop")];
  const lensTabs = [...ledger.querySelectorAll(".custody-lens-tab")];
  const indexLabel = document.getElementById("custodyIndex");
  const title = document.getElementById("custodyTitle");
  const action = document.getElementById("custodyAction");
  const lensCode = document.getElementById("custodyLensCode");
  const lensTitle = document.getElementById("custodyLensTitle");
  const lensText = document.getElementById("custodyLensText");
  const photoPanel = document.getElementById("custodyPhotoPanel");
  const photo = document.getElementById("custodyPhoto");
  const photoKicker = document.getElementById("custodyPhotoKicker");
  const photoTitle = document.getElementById("custodyPhotoTitle");
  const lensMeta = {
    record: { code: "RECORD", title: "留下的记录" },
    missing: { code: "MISSING", title: "正在丢失" },
    cost: { code: "COST", title: "谁在承担" }
  };
  let activeStop = stops[0];
  let activeLens = "record";

  stops.forEach(stop => {
    if (!stop.dataset.photo) return;
    const preload = new Image();
    preload.src = stop.dataset.photo;
  });

  const renderLens = () => {
    const index = Number(activeStop.dataset.index || 0);
    const meta = lensMeta[activeLens];
    lensCode.textContent = `TRACE ${String(index + 1).padStart(2, "0")} / ${meta.code}`;
    lensTitle.textContent = meta.title;
    lensText.textContent = activeStop.dataset[activeLens];
  };

  const activate = stop => {
    const index = Number(stop.dataset.index || 0);
    activeStop = stop;
    ledger.style.setProperty("--stage", index);
    stops.forEach(item => {
      const active = item === stop;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    indexLabel.textContent = `HANDOVER ${String(index + 1).padStart(2, "0")} / 04`;
    title.textContent = stop.dataset.title;
    action.textContent = stop.dataset.action;
    if (photo && stop.dataset.photo) {
      photo.src = stop.dataset.photo;
      photo.alt = stop.dataset.photoAlt || "中国电子设备流转现场";
      photoKicker.textContent = stop.dataset.photoKicker || "CHINA / FIELD";
      photoTitle.textContent = stop.dataset.photoTitle || stop.dataset.title;
      if (photoPanel && typeof photoPanel.animate === "function") {
        photoPanel.animate(
          [{ opacity: .42, transform: "translateY(7px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 380, easing: "cubic-bezier(.2,.7,.2,1)" }
        );
      }
    }
    renderLens();
  };

  const activateLens = tab => {
    activeLens = tab.dataset.lens;
    lensTabs.forEach(item => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    renderLens();
  };

  stops.forEach((stop, index) => {
    ["mouseenter", "focus", "click"].forEach(eventName => stop.addEventListener(eventName, () => activate(stop)));
    stop.addEventListener("keydown", event => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = stops[(index + direction + stops.length) % stops.length];
      next.focus();
      activate(next);
    });
  });
  lensTabs.forEach((tab, index) => {
    ["mouseenter", "focus", "click"].forEach(eventName => tab.addEventListener(eventName, () => activateLens(tab)));
    tab.addEventListener("keydown", event => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = lensTabs[(index + direction + lensTabs.length) % lensTabs.length];
      next.focus();
      activateLens(next);
    });
  });
  activate(stops[0]);
  activateLens(lensTabs[0]);
}

function setupCustodyLedgerV2() {
  const ledger = document.getElementById("custodyLedger");
  if (!ledger) return;

  const stops = [...ledger.querySelectorAll(".custody-stop")];
  const lensTabs = [...ledger.querySelectorAll(".custody-lens-tab")];
  const indexLabel = document.getElementById("custodyIndex");
  const title = document.getElementById("custodyTitle");
  const action = document.getElementById("custodyAction");
  const lensCode = document.getElementById("custodyLensCode");
  const lensTitle = document.getElementById("custodyLensTitle");
  const lensText = document.getElementById("custodyLensText");
  const gallery = document.getElementById("custodyGallery");
  const galleryImages = [0, 1, 2].map(index => document.getElementById(`custodyGalleryImage${index}`));
  const galleryKickers = [0, 1, 2].map(index => document.getElementById(`custodyGalleryKicker${index}`));
  const galleryTitles = [0, 1, 2].map(index => document.getElementById(`custodyGalleryTitle${index}`));
  const lensMeta = {
    record: { code: "RECORD", title: "留下的记录" },
    missing: { code: "MISSING", title: "正在丢失" },
    cost: { code: "COST", title: "谁在承担" }
  };
  const custodyStories = [
    {
      record: "购买凭证、设备型号和原始所有者仍能把设备与一个家庭对应起来；但只有在上门回收、门店接收和平台订单被写入同一条记录时，这份身份才会跟着旧设备继续移动。",
      missing: "旧设备一离开家庭，消费者通常只知道“已经卖掉”或“已经收走”。下一位接手者、临时仓位置与最终处理企业若没有回填，第一处追踪断点就在家门外出现。",
      cost: "消费者获得换新便利，也最早退出设备生命周期。低报价、隐私清除和去向核验的时间成本，被转交给回收员、平台与后端处理者。",
      photos: [
        ["assets/images/custody-consumer-01-china.jpg", "天津社区工作人员从居民家中搬出废旧洗衣机", "CHINA / HOME", "旧家电离开家庭"],
        ["assets/images/custody-consumer-02-china.jpg", "工作人员将回收的旧家电运往临时仓储点", "CHINA / TRANSFER", "从上门回收到临时仓"],
        ["assets/images/custody-consumer-03-china.jpg", "天津居民社区设置的废旧家电回收点", "CHINA / COMMUNITY", "社区回收点接住第一程"]
      ]
    },
    {
      record: "估价单、验机结果、收货时间和接收方可以留下交易轨迹；若平台订单、线下转卖和仓储批次使用同一设备编号，跨手交易仍可被复原。",
      missing: "设备可能在线上线下多次转卖，型号保留，连续位置却逐渐消失。平台往往记录一笔成交，却未必记录商品离开后被谁拆开、送往哪里。",
      cost: "平台和商贩掌握流量、报价与下一站选择权，却不一定承担最终处置责任。利润在交易节点实现，滞销、退货和流向不明的压力继续下沉。",
      photos: [
        ["assets/images/custody-market-01-china.jpg", "中国年轻消费者参与旧电子产品循环活动", "CHINA / CIRCULATION", "循环消费成为新入口"],
        ["assets/images/custody-market-02-china.jpg", "中国二手门店工作人员检查待流通设备", "CHINA / SECOND-HAND", "门店验机决定下一站"],
        ["assets/images/custody-market-03-china.jpg", "中国二手商品门店的回收交易现场", "CHINA / TRADE", "一次成交留下多少记录"]
      ]
    },
    {
      record: "维修单能够记录故障、替换零件、维修动作与再售状态。若旧电池、破损屏幕和主板也按批次登记，延寿才不会以材料失踪为代价。",
      missing: "设备修好后仍有身份，被换下的零件却常从记录中消失。它们体积小、价值分散，更容易进入无票据的回收、暂存与混合运输。",
      cost: "维修延长整机寿命，却把拆机粉尘、焊接烟雾、隐私清除和质量担保集中到工位。延寿的社会收益，与职业暴露和售后责任并不总由同一方承担。",
      photos: [
        ["assets/images/custody-repair-01-china.jpg", "中国报道中的手机与拆下部件检测现场", "CHINA / PARTS", "整机被拆成零件清单"],
        ["assets/images/custody-repair-02-china.jpg", "中国手机数据安全处置中心的设备工位", "CHINA / DATA", "数据清除也是维修责任"],
        ["assets/images/custody-repair-03-china.jpg", "中国实验室工作人员检测旧手机数据与部件", "CHINA / LAB", "检测记录能否跟随设备"]
      ]
    },
    {
      record: "正规拆解可以留下入厂批次、设备数量、材料种类、危险废物去向与处理方式。这些记录决定材料是否真正进入合规再生链。",
      missing: "进入破碎和分拣后，完整设备被还原为金属、塑料、电池与粉末，前序所有权和单机身份随之终止。若批次记录不完整，责任只能追到厂门，无法追到材料末端。",
      cost: "拆解者处在议价权最低、暴露最直接的位置。粉尘、烟雾、废液和危险材料贴近身体，而前端换新产生的便利与利润早已离开现场。",
      photos: [
        ["assets/images/custody-dismantling-01-china.jpg", "中国正规拆解企业中工人处理废旧冰箱", "CHINA / FACTORY", "废旧冰箱进入拆解线"],
        ["assets/images/custody-dismantling-02-china.jpg", "中国正规拆解企业分拣电子废弃物部件", "CHINA / SORTING", "部件按材料重新分类"],
        ["assets/images/custody-dismantling-03-china.jpg", "中国正规企业在封闭工位拆解废旧显示设备", "CHINA / DISMANTLING", "封闭工位接住末端风险"]
      ]
    }
  ];

  let activeStop = stops[0];
  let activeLens = "record";

  custodyStories.flatMap(stage => stage.photos).forEach(([src]) => {
    const preload = new Image();
    preload.src = src;
  });

  const renderLens = () => {
    const index = Number(activeStop.dataset.index || 0);
    const meta = lensMeta[activeLens];
    const story = custodyStories[index];
    lensCode.textContent = `TRACE ${String(index + 1).padStart(2, "0")} / ${meta.code}`;
    lensTitle.textContent = meta.title;
    lensText.textContent = story[activeLens];
  };

  const renderGallery = index => {
    custodyStories[index].photos.forEach(([src, alt, kicker, photoTitle], photoIndex) => {
      if (galleryImages[photoIndex]) {
        galleryImages[photoIndex].src = src;
        galleryImages[photoIndex].alt = alt;
      }
      if (galleryKickers[photoIndex]) galleryKickers[photoIndex].textContent = kicker;
      if (galleryTitles[photoIndex]) galleryTitles[photoIndex].textContent = photoTitle;
    });
    if (gallery && typeof gallery.animate === "function") {
      gallery.animate(
        [{ opacity: .38, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 420, easing: "cubic-bezier(.2,.7,.2,1)" }
      );
    }
  };

  const activate = stop => {
    const index = Number(stop.dataset.index || 0);
    activeStop = stop;
    ledger.style.setProperty("--stage", index);
    stops.forEach(item => {
      const active = item === stop;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    indexLabel.textContent = `HANDOVER ${String(index + 1).padStart(2, "0")} / 04`;
    title.textContent = stop.dataset.title;
    action.textContent = stop.dataset.action;
    renderLens();
    renderGallery(index);
  };

  const activateLens = tab => {
    activeLens = tab.dataset.lens;
    lensTabs.forEach(item => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    renderLens();
  };

  stops.forEach((stop, index) => {
    ["mouseenter", "focus", "click"].forEach(eventName => stop.addEventListener(eventName, () => activate(stop)));
    stop.addEventListener("keydown", event => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = stops[(index + direction + stops.length) % stops.length];
      next.focus();
      activate(next);
    });
  });
  lensTabs.forEach((tab, index) => {
    ["mouseenter", "focus", "click"].forEach(eventName => tab.addEventListener(eventName, () => activateLens(tab)));
    tab.addEventListener("keydown", event => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = lensTabs[(index + direction + lensTabs.length) % lensTabs.length];
      next.focus();
      activateLens(next);
    });
  });

  activate(stops[0]);
  activateLens(lensTabs[0]);
}

function setupRiskLexicon() {
  const lexicon = document.getElementById("riskLexicon");
  if (!lexicon) return;
  const terms = [...lexicon.querySelectorAll(".risk-term")];
  const code = document.getElementById("riskLexiconCode");
  const title = document.getElementById("riskLexiconTitle");
  const copy = document.getElementById("riskLexiconText");
  const readout = lexicon.querySelector(".risk-lexicon-readout");

  const activate = term => {
    terms.forEach(item => item.classList.toggle("is-active", item === term));
    code.textContent = term.dataset.code;
    title.textContent = term.dataset.title;
    copy.textContent = term.dataset.text;
    if (readout && typeof readout.animate === "function") {
      readout.animate(
        [{ opacity: .46, transform: "translateY(5px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 260, easing: "ease-out" }
      );
    }
  };

  terms.forEach(term => {
    ["mouseenter", "focus", "click"].forEach(eventName => term.addEventListener(eventName, () => activate(term)));
  });
  activate(terms[0]);
}

function setupRadar() {
  drawPressureDashboard();
  setupRiskTransferBoard();
  setupCustodyLedgerV2();
  setupRiskLexicon();
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
const typingTimers = new WeakMap();

function typeInto(element, text, speed = 18) {
  if (!element) return;
  clearInterval(typingTimers.get(element));
  element.textContent = "";
  let index = 0;
  const timer = setInterval(() => {
    element.textContent = text.slice(0, index += 1);
    if (index >= text.length) {
      clearInterval(timer);
      typingTimers.delete(element);
    }
  }, speed);
  typingTimers.set(element, timer);
}

function drawHundredGrid() {
  const grid = document.getElementById("hundredGrid");
  if (!grid) return;
  const meaning = document.getElementById("hundredMeaning");
  const groups = [
    { limit: 16, className: "formal", kicker: "正式收集", title: "记录链条相对完整", text: "设备进入有资质渠道后，所有权交接、位置、拆解方式和材料去向更可能留下连续记录。" },
    { limit: 37, className: "drawer", kicker: "可能去向 01", title: "闲置：设备还在，回收尚未开始", text: "旧设备停在抽屉、仓库或机构资产清单中。位置可能清楚，但它尚未进入末端处理。" },
    { limit: 58, className: "resale", kicker: "可能去向 02", title: "二手与维修：寿命延长，记录可能换手", text: "再使用能够推迟废弃，却也可能让设备在多次转卖、维修和翻新后失去原始身份。" },
    { limit: 79, className: "mixed", kicker: "可能去向 03", title: "混入普通废物流：物质被看见，身份已丢失", text: "当电子产品与生活垃圾混在一起，电池、线路板和金属仍存在，但很难再按电子废弃物追踪。" },
    { limit: 100, className: "dispersed", kicker: "可能去向 04", title: "分散处理：价值被回收，责任未必被记录", text: "小规模拆解可能提取有价材料，却难以同步留下污染控制、残余物和最终去向的公共记录。" }
  ];
  grid.innerHTML = "";
  for (let i = 0; i < 100; i += 1) {
    const group = groups.find(item => i < item.limit);
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = group.className;
    cell.style.transitionDelay = `${i * 8}ms`;
    cell.setAttribute("aria-label", `第 ${i + 1} 份：${group.title}`);
    const activate = () => {
      grid.querySelectorAll("button").forEach(button => button.classList.toggle("is-active", button.classList.contains(group.className)));
      meaning.querySelector("span").textContent = group.kicker;
      meaning.querySelector("strong").textContent = group.title;
      typeInto(meaning.querySelector("p"), group.text, 14);
    };
    ["mouseenter", "focus", "click"].forEach(eventName => cell.addEventListener(eventName, activate));
    grid.appendChild(cell);
  }
}

function drawFactMatrix() {
  const matrix = document.getElementById("ewasteFactMatrix");
  const live = document.getElementById("factLiveDetail");
  if (!matrix || !live) return;
  const facts = [
    ["107000", "架", "客机重量", "2022 年全球电子废弃物的重量，相当于约 10.7 万架最大型客机。数字第一次把抽象吨位变成可想象的体积。"],
    ["7.8", "千克/人", "全球人均产生量", "平均到每个人，2022 年全球产生约 7.8 千克电子废弃物；设备更小，并不意味着物质负担更轻。"],
    ["1400", "万吨", "主要进入填埋", "约 1400 万吨电子废弃物被直接丢弃，多数进入填埋场。离开家庭之后，它们没有自动进入资源循环。"],
    ["2040", "万吨", "小型设备", "玩具、微波炉、吸尘器和电子烟等小型设备合计约 2040 万吨，是最庞大也最分散的类别。"],
    ["12", "%", "小型设备回收率", "小型设备只有约 12% 被正式收集和回收。体积越小，越容易被遗忘在抽屉或混入普通垃圾。"],
    ["460", "万吨", "小型信息通信设备", "笔记本、手机、路由器和键盘等小型信息通信设备约 460 万吨，更新周期短，流通路径却更复杂。"],
    ["22", "%", "小型信息通信回收率", "小型信息通信设备的正式收集和回收率约 22%。高价值零件没有自然转化成高覆盖率。"],
    ["60→240", "万吨", "光伏板废弃物", "光伏板废弃物可能从 2022 年的约 60 万吨增至 2030 年的 240 万吨，低碳设备也需要提前设计末端。"],
    ["81", "个国家", "建立电子废物政策", "截至 2023 年，全球有 81 个国家制定电子废物政策、法律或法规，制度覆盖仍未追上设备流动范围。"],
    ["67", "个国家", "引入生产者责任", "在已有电子废物立法的国家中，67 个设置了生产者责任延伸条款，让制造者承担部分末端义务。"],
    ["46", "个国家", "设定收集率目标", "只有 46 个国家在政策中写入电子废物收集率目标。没有可核验目标，回收承诺很难变成进度。"],
    ["36", "个国家", "设定回收率目标", "进一步设置电子废物回收率目标的国家只有 36 个。制度存在，不代表处理成效已经被量化。"]
  ];
  const factPositions = ["0% 0%", "33.333% 0%", "66.667% 0%", "100% 0%", "0% 50%", "33.333% 50%", "66.667% 50%", "100% 50%", "0% 100%", "33.333% 100%", "66.667% 100%", "100% 100%"];
  matrix.innerHTML = "";
  facts.forEach((fact, index) => {
    const [value, unit, title, detail] = fact;
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "fact-matrix-tile";
    tile.style.setProperty("--fact-image", "url('assets/images/e-waste-facts-sprite.svg')");
    tile.style.setProperty("--fact-pos", factPositions[index]);
    tile.innerHTML = `<small>${String(index + 1).padStart(2, "0")}</small><strong>${value}<em>${unit}</em></strong><span>${title}</span><p>${detail}</p>`;
    tile.setAttribute("aria-label", `${title}：${value}${unit}。${detail}`);
    const activate = () => {
      matrix.querySelectorAll("button").forEach(button => button.classList.toggle("is-active", button === tile));
      live.querySelector("span").textContent = `${String(index + 1).padStart(2, "0")} / 12`;
      live.querySelector("h3").textContent = `${value}${unit} · ${title}`;
      typeInto(live.querySelector("p"), detail, 16);
    };
    ["mouseenter", "focus", "click"].forEach(eventName => tile.addEventListener(eventName, activate));
    matrix.appendChild(tile);
  });
}

function drawGapFlow() {
  const c = document.getElementById("gapFlowChart");
  if (!c) return;
  c.innerHTML = `
    <header class="gap-flow-head"><div><span>TRACEABILITY DASHBOARD</span><h3>设备离开用户之后，记录在哪一步断掉？</h3></div><small>交互示意</small></header>
    <div class="gap-flow-grid">
      <section class="gap-sankey-panel">
        <div class="gap-panel-title"><b>可能流向</b><span>悬停查看每条路径</span></div>
        <svg class="gap-sankey" viewBox="0 0 640 390" aria-label="旧设备四种可能流向">
          <rect class="gap-source-node" x="22" y="153" width="158" height="78" rx="4"></rect>
          <text x="101" y="185" text-anchor="middle">旧设备</text><text x="101" y="208" text-anchor="middle">离开用户</text>
          <path class="gap-sankey-flow" data-route="drawer" d="M180 167 C285 167 315 53 430 53"></path>
          <path class="gap-sankey-flow" data-route="resale" d="M180 183 C292 183 318 143 430 143"></path>
          <path class="gap-sankey-flow" data-route="formal" d="M180 200 C292 200 318 233 430 233"></path>
          <path class="gap-sankey-flow" data-route="informal" d="M180 217 C285 217 315 323 430 323"></path>
          <g class="gap-route-node" data-route="drawer"><rect x="430" y="20" width="180" height="66" rx="4"></rect><text x="454" y="59">闲置</text></g>
          <g class="gap-route-node" data-route="resale"><rect x="430" y="110" width="180" height="66" rx="4"></rect><text x="454" y="149">二手 / 维修</text></g>
          <g class="gap-route-node" data-route="formal"><rect x="430" y="200" width="180" height="66" rx="4"></rect><text x="454" y="239">正规回收</text></g>
          <g class="gap-route-node" data-route="informal"><rect x="430" y="290" width="180" height="66" rx="4"></rect><text x="454" y="329">未记录去向</text></g>
        </svg>
        <div class="gap-flow-detail" aria-live="polite"><span>正规回收</span><p>进入有资质渠道，交接、拆解与材料去向更可能形成连续记录。</p></div>
      </section>
      <section class="gap-record-panel">
        <div class="gap-panel-title"><b>四项记录检查</b><span>所有权 / 位置 / 处理 / 材料</span></div>
        <div class="gap-record-list">
          <button type="button" data-route="drawer"><span>闲置</span><i class="is-on"></i><i></i><i></i><i></i><b>停在原主处</b></button>
          <button type="button" data-route="resale"><span>二手 / 维修</span><i class="is-on"></i><i class="is-on"></i><i></i><i></i><b>交接后易断点</b></button>
          <button type="button" data-route="formal"><span>正规回收</span><i class="is-on"></i><i class="is-on"></i><i class="is-on"></i><i class="is-on"></i><b>记录相对完整</b></button>
          <button type="button" data-route="informal" style="--checks:0"><span>未记录去向</span><i></i><i></i><i></i><i></i><b>链条不可见</b></button>
        </div>
        <p>右侧四格为编辑部示意：分别检查所有权交接、设备位置、处理方式和材料去向是否留下记录，不代表统计比例。</p>
        <div class="gap-mini-grid">
          <section class="gap-mini-continuity">
            <header><b>记录连续性</b><span>编辑部示意分值</span></header>
            <div class="gap-mini-bars">
              <span data-mini-route="drawer"><b>闲置</b><i style="--score:25%"></i><em>1/4</em></span>
              <span data-mini-route="resale"><b>二手 / 维修</b><i style="--score:50%"></i><em>2/4</em></span>
              <span data-mini-route="formal"><b>正规回收</b><i style="--score:100%"></i><em>4/4</em></span>
              <span data-mini-route="informal"><b>未记录</b><i style="--score:2%"></i><em>0/4</em></span>
            </div>
          </section>
          <section class="gap-mini-breaks">
            <header><b>哪类记录最易缺席</b><span>四条路径对照</span></header>
            <div class="gap-mini-columns">
              <span style="--height:76%"><i></i><b>所有权</b></span>
              <span style="--height:54%"><i></i><b>位置</b></span>
              <span style="--height:33%"><i></i><b>处理</b></span>
              <span style="--height:22%"><i></i><b>材料</b></span>
            </div>
          </section>
        </div>
        <div class="gap-mini-readout" aria-live="polite"><span>当前路径</span><strong>正规回收 · 4/4 项记录</strong></div>
      </section>
    </div>`;

  const detail = c.querySelector(".gap-flow-detail");
  const routeText = {
    drawer: ["闲置", "设备仍在家庭或机构中，位置相对清楚，但尚未发生正式交接与末端处理。"],
    resale: ["二手 / 维修", "设备可能延长寿命；一旦多次转手，原始所有权和最终去向容易在中途断开。"],
    formal: ["正规回收", "进入有资质渠道，交接、拆解与材料去向更可能形成连续记录。"],
    informal: ["未记录去向", "设备已经流动，但接手者、拆解方式和材料终点均难进入公共统计。"]
  };
  const routeTargets = c.querySelectorAll("[data-route]");
  const activate = route => {
    routeTargets.forEach(target => target.classList.toggle("is-active", target.dataset.route === route));
    detail.querySelector("span").textContent = routeText[route][0];
    detail.querySelector("p").textContent = routeText[route][1];
    c.querySelectorAll("[data-mini-route]").forEach(row => row.classList.toggle("is-active", row.dataset.miniRoute === route));
    const score = { drawer: "1/4", resale: "2/4", formal: "4/4", informal: "0/4" }[route];
    c.querySelector(".gap-mini-readout strong").textContent = `${routeText[route][0]} · ${score} 项记录`;
  };
  routeTargets.forEach(target => {
    ["mouseenter", "focus", "click"].forEach(eventName => target.addEventListener(eventName, () => activate(target.dataset.route)));
  });
  activate("formal");
}

function drawRouteFlow() {
  const c = document.getElementById("afterlifeSankey");
  if (!c) return;
  const svg = svgEl("svg", { viewBox: "0 0 760 440", "aria-hidden": "true" });
  const routeDetails = {
    drawer: ["闲置库存", "位置仍可识别，但所有权没有交接，处理责任暂时停在原处。"],
    resale: ["二手 / 维修", "设备继续使用，寿命被延长；每次转手都需要留下新的交接记录。"],
    formal: ["正规回收", "交接、运输和拆解都有凭证，材料去向才可能被复核。"],
    informal: ["未记录处理", "设备已经离开用户，但接手人、拆解方式与材料终点同时消失。"]
  };
  const paths = [
    { route: "drawer", color: "#65746f", width: 32, d: "M168 220 C220 220 225 47 275 47" },
    { route: "drawer", color: "#65746f", width: 22, d: "M443 47 C520 47 526 380 596 380" },
    { route: "resale", color: "#a7c900", width: 46, d: "M168 220 C218 220 228 146 275 146" },
    { route: "resale", color: "#c8f000", width: 40, d: "M443 146 C514 146 524 118 596 118" },
    { route: "formal", color: "#6b929c", width: 40, d: "M168 220 C220 220 225 252 275 252" },
    { route: "formal", color: "#6b929c", width: 34, d: "M443 252 C510 252 527 258 596 258" },
    { route: "informal", color: "#e85d38", width: 52, d: "M168 220 C220 220 228 369 275 369" },
    { route: "informal", color: "#ffae00", width: 46, d: "M443 369 C516 369 525 380 596 380" }
  ];
  const nodes = [
    { route: "source", label: "旧设备离开用户", note: "所有权开始变化", x: 28, y: 145, w: 140, h: 150, fill: "#111c19" },
    { route: "drawer", label: "闲置", note: "停在原处", x: 275, y: 18, w: 168, h: 58, fill: "#26332f" },
    { route: "resale", label: "二手 / 维修", note: "延长使用", x: 275, y: 112, w: 168, h: 68, fill: "#263d35" },
    { route: "formal", label: "正规回收", note: "进入凭证链", x: 275, y: 216, w: 168, h: 72, fill: "#25404a" },
    { route: "informal", label: "未记录处理", note: "责任断开", x: 275, y: 334, w: 168, h: 70, fill: "#573222" },
    { route: "resale", label: "继续使用", note: "设备延寿", x: 596, y: 80, w: 140, h: 76, fill: "#283e21" },
    { route: "formal", label: "材料再生", note: "去向可核验", x: 596, y: 220, w: 140, h: 76, fill: "#29434a" },
    { route: "break", label: "责任断点", note: "记录不可见", x: 596, y: 342, w: 140, h: 76, fill: "#442b22" }
  ];

  paths.forEach(item => {
    const path = svgEl("path", {
      class: "afterlife-flow-path",
      d: item.d,
      fill: "none",
      stroke: item.color,
      "stroke-width": item.width,
      "stroke-linecap": "butt",
      "data-route": item.route,
      tabindex: "0"
    });
    const title = svgEl("title");
    title.textContent = routeDetails[item.route][0];
    path.appendChild(title);
    svg.appendChild(path);
  });

  nodes.forEach(item => {
    const group = svgEl("g", {
      class: "afterlife-flow-node",
      "data-route": item.route,
      tabindex: item.route === "source" ? "-1" : "0"
    });
    group.appendChild(svgEl("rect", {
      x: item.x, y: item.y, width: item.w, height: item.h,
      rx: 2, fill: item.fill, stroke: "#52635e", "stroke-width": 1.5
    }));
    const label = svgEl("text", {
      x: item.x + 16, y: item.y + item.h / 2 - 3,
      fill: "#fff", "font-size": item.route === "source" ? 17 : 15, "font-weight": 900
    });
    label.textContent = item.label;
    const note = svgEl("text", {
      x: item.x + 16, y: item.y + item.h / 2 + 20,
      fill: item.route === "informal" || item.route === "break" ? "#ffae00" : "#9eb0aa",
      "font-size": 10, "font-weight": 700
    });
    note.textContent = item.note;
    group.append(label, note);
    svg.appendChild(group);
  });
  c.replaceChildren(svg);

  const readout = c.closest(".afterlife-sankey-panel")?.querySelector(".afterlife-flow-readout");
  const interactive = [...svg.querySelectorAll("[data-route]")];
  const relatedRoute = (nodeRoute, route) => nodeRoute === route || (nodeRoute === "break" && ["drawer", "informal"].includes(route));
  const activate = route => {
    if (!routeDetails[route]) return;
    interactive.forEach(el => {
      const elRoute = el.dataset.route;
      el.classList.toggle("is-active", relatedRoute(elRoute, route));
      el.classList.toggle("is-dim", elRoute !== "source" && !relatedRoute(elRoute, route));
    });
    if (readout) {
      readout.querySelector("strong").textContent = routeDetails[route][0];
      readout.querySelector("p").textContent = routeDetails[route][1];
    }
  };
  interactive.forEach(el => {
    const route = el.dataset.route;
    if (!routeDetails[route]) return;
    ["pointerenter", "focus", "click"].forEach(eventName => el.addEventListener(eventName, () => activate(route)));
    el.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate(route);
      }
    });
  });
  activate("formal");
}

function setupTracePuzzle() {
  const board = document.getElementById("tracePuzzle");
  const shuffleButton = document.getElementById("shuffleTracePuzzle");
  const moveCounter = document.getElementById("traceMoveCount");
  const status = document.getElementById("tracePuzzleStatus");
  if (!board || !shuffleButton || !moveCounter || !status) return;

  const labels = ["设备身份", "所有权", "交接地点", "检测结果", "数据清除", "处理资质", "拆解批次", "材料去向"];
  const colors = ["#ffae00", "#c8f000", "#6b929c", "#e85d38", "#c8f000", "#ffae00", "#6b929c", "#e85d38"];
  const solved = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  let state = [...solved];
  let moves = 0;

  const adjacent = (a, b) => Math.abs(Math.floor(a / 3) - Math.floor(b / 3)) + Math.abs(a % 3 - b % 3) === 1;
  const isSolved = () => state.every((value, index) => value === solved[index]);
  const render = () => {
    board.replaceChildren();
    state.forEach((value, index) => {
      if (!value) {
        const blank = document.createElement("span");
        blank.className = "trace-puzzle-blank";
        blank.setAttribute("aria-hidden", "true");
        board.appendChild(blank);
        return;
      }
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "trace-tile";
      tile.style.setProperty("--tile-color", colors[value - 1]);
      tile.setAttribute("aria-label", `移动第 ${value} 块：${labels[value - 1]}`);
      tile.innerHTML = `<b>${String(value).padStart(2, "0")}</b><span>${labels[value - 1]}</span>`;
      tile.addEventListener("click", () => {
        const blankIndex = state.indexOf(0);
        if (!adjacent(index, blankIndex)) return;
        [state[index], state[blankIndex]] = [state[blankIndex], state[index]];
        moves += 1;
        render();
      });
      board.appendChild(tile);
    });
    const complete = isSolved();
    board.classList.toggle("is-solved", complete);
    status.classList.toggle("is-solved", complete);
    moveCounter.textContent = moves;
    status.querySelector("strong").textContent = complete ? "证据链已经连续" : "记录仍在错位";
    status.querySelector("p").textContent = complete
      ? "八项记录已经按交接顺序归位，这台设备的后半生具备了最小可核验链条。"
      : "点击空格旁的方块移动。拼合后，八项记录将形成连续顺序。";
  };
  const shuffle = () => {
    state = [...solved];
    let lastBlank = -1;
    for (let step = 0; step < 80; step += 1) {
      const blankIndex = state.indexOf(0);
      const candidates = state
        .map((_, index) => index)
        .filter(index => adjacent(index, blankIndex) && index !== lastBlank);
      const chosen = candidates[Math.floor(Math.random() * candidates.length)];
      lastBlank = blankIndex;
      [state[blankIndex], state[chosen]] = [state[chosen], state[blankIndex]];
    }
    if (isSolved()) [state[7], state[8]] = [state[8], state[7]];
    moves = 0;
    render();
  };
  shuffleButton.addEventListener("click", shuffle);
  shuffle();
}

function setupTraceVerifier() {
  const verifier = document.getElementById("traceVerifier");
  if (!verifier) return;
  const checks = [...verifier.querySelectorAll(".trace-check")];
  const score = document.getElementById("traceScore");
  const ring = verifier.querySelector(".trace-result-ring");
  const ringValue = document.getElementById("traceRingValue");
  const label = document.getElementById("traceResultLabel");
  const title = document.getElementById("traceResultTitle");
  const text = document.getElementById("traceResultText");
  const evidence = [...verifier.querySelectorAll(".trace-evidence-strip span")];
  const resultCopy = [
    ["记录尚未开始", "交出设备，不等于完成回收。", "至少确认接手主体、交接位置和处理方式，让设备离开视线以后仍有一条能被追问的路线。"],
    ["已确认一项", "一条线索，尚不足以还原去向。", "单独的企业名称、地址或处理承诺都可能成为孤立信息，还需要另外两项证据相互验证。"],
    ["记录接近连续", "两项证据已连接，仍有一个责任断点。", "已经可以缩小追问范围，但缺失的一项仍可能让最终处理主体或材料终点消失。"],
    ["最小证据链成立", "这次交接，已经具备可追问的起点。", "主体、位置和处理方式互相印证，设备离开用户后仍保留了一条可查询、可复盘的责任路线。"]
  ];
  const update = () => {
    const active = new Set(checks.filter(item => item.classList.contains("is-active")).map(item => item.dataset.trace));
    const count = active.size;
    const percent = Math.round(count / checks.length * 100);
    score.textContent = `${count}/3`;
    ring.style.setProperty("--trace-progress", `${count * 120}deg`);
    ringValue.textContent = percent;
    [label.textContent, title.textContent, text.textContent] = resultCopy[count];
    evidence.forEach((item, index) => {
      const enabled = (index < 2 && active.has("owner")) || (index === 2 && active.has("place")) || (index > 2 && active.has("process"));
      item.classList.toggle("is-active", enabled);
    });
  };
  checks.forEach(check => check.addEventListener("click", () => {
    const active = check.classList.toggle("is-active");
    check.setAttribute("aria-pressed", String(active));
    check.querySelector("i").textContent = active ? "凭证已点亮" : "等待核验";
    update();
  }));
  update();
}

function setupRoutes() {
  // The current afterlife chapter replaces the legacy route widgets with the
  // v37 dashboards before this shared initializer runs.
  if (document.body.classList.contains("afterlife-page")) return;
  setupRouteCommandDashboard();
  setupChainDiagnostic();
  setupEvidenceArchitecture();
  setupEwasteMaze();
}

function setupRouteCommandDashboard() {
  const dashboard = document.getElementById("routeCommandDashboard");
  if (!dashboard) return;

  const routes = {
    drawer: {
      name: "闲置",
      score: "1 / 3 项可核验",
      status: "位置可知，责任未交接",
      copy: "设备仍在家庭或机构中，原位置清楚，但没有接收主体与末端处理凭证。",
      checks: [true, false, false],
      risk: 54,
      riskText: "中等"
    },
    resale: {
      name: "二手 / 维修",
      score: "2 / 3 项可核验",
      status: "寿命延长，所有权易断",
      copy: "设备继续使用，但多次转手后，检测、数据清除和最终去向常被拆成不同记录。",
      checks: [true, true, false],
      risk: 68,
      riskText: "偏高"
    },
    formal: {
      name: "正规回收",
      score: "3 / 3 项可核验",
      status: "接收主体、位置与处理可查",
      copy: "设备进入有资质渠道，交接、检测与末端处理能够相互印证。",
      checks: [true, true, true],
      risk: 22,
      riskText: "较低"
    },
    informal: {
      name: "未记录处理",
      score: "0 / 3 项可核验",
      status: "接手、位置与末端同时变暗",
      copy: "设备离开原主后进入无凭证流通，收益被带走，风险与责任留在不可见处。",
      checks: [false, false, false],
      risk: 94,
      riskText: "很高"
    }
  };
  const buttons = [...dashboard.querySelectorAll("[data-route-command]")];
  const checkRows = [...dashboard.querySelectorAll("[data-route-check]")];
  const checkLabels = ["接收主体", "交接位置", "处理方式"];

  const activate = route => {
    const data = routes[route];
    if (!data) return;
    buttons.forEach(button => {
      const active = button.dataset.routeCommand === route;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    dashboard.dataset.activeRoute = route;
    document.getElementById("routeAuditScore").textContent = data.score;
    document.getElementById("routeAuditName").textContent = data.name;
    document.getElementById("routeAuditStatus").textContent = data.status;
    document.getElementById("routeAuditCopy").textContent = data.copy;
    checkRows.forEach((row, index) => {
      const visible = data.checks[index];
      row.classList.toggle("is-on", visible);
      const value = row.querySelector("b");
      if (value) value.textContent = visible ? "可查" : "缺失";
      row.setAttribute("aria-label", `${checkLabels[index]}：${visible ? "可查" : "缺失"}`);
    });
    const riskBar = document.getElementById("routeRiskBar");
    riskBar.style.width = `${data.risk}%`;
    riskBar.style.background = data.risk < 35 ? "#c8f000" : data.risk < 75 ? "#ffae00" : "#e85d38";
    document.getElementById("routeRiskText").textContent = data.riskText;
  };

  buttons.forEach(button => button.addEventListener("click", () => activate(button.dataset.routeCommand)));
  activate("formal");
}

function setupChainDiagnostic() {
  const dashboard = document.getElementById("chainDiagnosticDashboard");
  if (!dashboard) return;

  const routes = {
    drawer: {
      name: "闲置",
      verdict: "记录停在原处",
      checks: [true, true, false, false],
      copy: "设备身份与原所有权仍可辨认，但没有正式交接，末端处理也尚未发生。"
    },
    resale: {
      name: "二手 / 维修",
      verdict: "转手越多，断点越多",
      checks: [true, false, true, false],
      copy: "设备继续使用，交接地点仍可能被找到；但所有权和最终处理凭证容易在多次转手中断开。"
    },
    formal: {
      name: "正规回收",
      verdict: "链条完整",
      checks: [true, true, true, true],
      copy: "设备身份贯穿交接、检测和末端处理，四项记录能够互相验证。"
    },
    informal: {
      name: "未记录处理",
      verdict: "记录失联",
      checks: [false, false, false, false],
      copy: "设备继续流动，公共记录却无法回答它是谁、由谁接手、在哪里以及如何被处理。"
    }
  };
  const buttons = [...dashboard.querySelectorAll("[data-diagnostic-route]")];
  const metrics = [...dashboard.querySelectorAll("[data-diagnostic-check]")];
  const bars = [...dashboard.querySelectorAll(".diagnostic-bars i")];
  const spineSegments = [...dashboard.querySelectorAll(".diagnostic-spine > i")];

  const activate = route => {
    const data = routes[route];
    if (!data) return;
    buttons.forEach(button => {
      const active = button.dataset.diagnosticRoute === route;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    dashboard.dataset.activeRoute = route;
    document.getElementById("diagnosticVerdict").textContent = data.verdict;
    document.getElementById("diagnosticRouteName").textContent = data.name;
    document.getElementById("diagnosticNarrative").textContent = data.copy;
    metrics.forEach((metric, index) => metric.classList.toggle("is-on", data.checks[index]));
    bars.forEach((bar, index) => bar.classList.toggle("is-on", data.checks[index]));
    spineSegments.forEach((segment, index) => {
      segment.classList.toggle("is-on", data.checks[index] && data.checks[index + 1]);
    });
  };

  buttons.forEach(button => button.addEventListener("click", () => activate(button.dataset.diagnosticRoute)));
  activate("formal");
}

function setupEvidenceArchitecture() {
  const architecture = document.getElementById("evidenceArchitecture");
  if (!architecture) return;
  const buttons = [...architecture.querySelectorAll("[data-evidence]")];
  const copy = [
    ["记录尚未开始", "点击上方三项问题，逐步建立最小责任链。"],
    ["只有一条线索", "单项信息只能缩小追问范围，还不能独立证明设备的去向。"],
    ["仍有一个责任断点", "两项证据已经相连，但缺失的一项仍会让责任在末端中断。"],
    ["最小证据链成立", "主体、位置与处理方式彼此印证，这次交接已经具备可追问的起点。"]
  ];

  const update = () => {
    const count = buttons.filter(button => button.getAttribute("aria-pressed") === "true").length;
    document.getElementById("evidenceScore").textContent = count;
    document.getElementById("evidenceCoreScore").textContent = `${count} / 3`;
    document.getElementById("evidenceVerdict").textContent = copy[count][0];
    document.getElementById("evidenceCopy").textContent = copy[count][1];
    architecture.classList.toggle("evidence-complete", count === buttons.length);
    architecture.style.setProperty("--evidence-progress", `${count / buttons.length * 100}%`);
  };

  buttons.forEach(button => button.addEventListener("click", () => {
    const active = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(active));
    button.classList.toggle("is-active", active);
    update();
  }));
  update();
}

function setupEwasteMaze() {
  const maze = document.getElementById("ewasteMaze");
  if (!maze) return;
  const routes = {
    drawer: {
      label: "闲置",
      title: "设备停下了，责任也暂时停在原处。",
      copy: "原位置仍然清楚，但没有交接、检测与末端凭证，责任链尚未真正启动。"
    },
    resale: {
      label: "二手 / 维修",
      title: "寿命被延长，交接记录不能随之消失。",
      copy: "再次使用不是风险本身；多次转手却会不断增加身份、所有权和最终去向的断点。"
    },
    formal: {
      label: "正规回收",
      title: "出口可见，路径也必须可复盘。",
      copy: "交接主体、运输位置与处理凭证沿路保留，设备才能真正走出责任迷宫。"
    },
    informal: {
      label: "未记录处理",
      title: "设备仍在移动，公共记录却失去了它。",
      copy: "当接手主体、拆解方式和材料终点同时不可见，风险与责任便被留在迷宫深处。"
    }
  };
  const buttons = [...maze.querySelectorAll("[data-maze-route]")];
  const paths = [...maze.querySelectorAll("[data-maze-path]")];

  const activate = route => {
    const data = routes[route];
    if (!data) return;
    buttons.forEach(button => {
      const active = button.dataset.mazeRoute === route;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    paths.forEach(path => path.classList.toggle("is-active", path.dataset.mazePath === route));
    maze.dataset.activeRoute = route;
    document.getElementById("mazeRouteLabel").textContent = data.label;
    document.getElementById("mazeRouteTitle").textContent = data.title;
    document.getElementById("mazeRouteCopy").textContent = data.copy;
  };

  buttons.forEach(button => button.addEventListener("click", () => activate(button.dataset.mazeRoute)));
  activate("formal");
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
  drawFactMatrix();
  drawGapFlow();
  setupRadar();
  drawWordCloud();
  drawGlobalDistributionMap();
  drawPlatformClouds();
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

// Afterlife chapter dashboards and interactions.
(function () {
  'use strict';

  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function majorLayout(host, reverse) {
    let node = host.parentElement;
    while (node && node !== document.body) {
      const children = Array.from(node.children).filter((child) => child !== host || true);
      if (children.length === 2) {
        node.classList.add('v37-balanced-layout');
        children.forEach((child) => {
          child.classList.add(child.contains(host) ? 'v37-visual-col' : 'v37-copy-col');
        });
        if (reverse) node.classList.add('v37-visual-first');
        return node;
      }
      node = node.parentElement;
    }
    return null;
  }

  function routeDashboard() {
    const host = q('#routeCommandDashboard');
    if (!host) return;
    majorLayout(host, false);
    host.className = 'device-life-comic';
    host.innerHTML = `
      <header class="comic-coverline">
        <div><span>DEVICE BIOGRAPHY / 设备小传</span><h3>一台电子设备的六格人生</h3></div>
        <b>NO. 7E-19-204</b>
      </header>
      <div class="comic-page" aria-label="电子设备从诞生、使用、闲置到延寿、回收和材料再生的六格漫画">
        <article class="comic-panel comic-panel--birth" tabindex="0">
          <span class="comic-number">01</span><b class="comic-chapter">初次点亮</b>
          <div class="comic-scene"><i class="comic-box"></i><i class="comic-box-lid"></i><i class="comic-phone comic-phone--happy"><u></u></i><em class="comic-burst">开箱</em></div>
          <p>从包装盒里醒来，它第一次拥有姓名、编号和主人。</p>
          <q>“你好，我会陪你很久。”</q>
        </article>
        <article class="comic-panel comic-panel--use" tabindex="0">
          <span class="comic-number">02</span><b class="comic-chapter">并肩生活</b>
          <div class="comic-scene"><i class="comic-table"></i><i class="comic-phone comic-phone--busy"><u></u></i><i class="comic-finger"></i><i class="comic-icons">✦<u>●</u><b>♫</b></i><em class="comic-motion">新消息</em></div>
          <p>照片、消息、工作和路线，让它成为用户生活的一部分。</p>
          <q>“今天也装满了故事。”</q>
        </article>
        <article class="comic-panel comic-panel--drawer" tabindex="0">
          <span class="comic-number">03</span><b class="comic-chapter">被放进抽屉</b>
          <div class="comic-scene"><i class="comic-drawer-frame"></i><i class="comic-drawer"></i><i class="comic-phone comic-phone--sleep"><u></u></i><em class="comic-z">Z<br>Z</em></div>
          <p>新设备到来后，它没有坏，只是慢慢离开了日常视线。</p>
          <q>“我是在休息，还是被忘记？”</q>
        </article>
        <article class="comic-panel comic-panel--repair" tabindex="0">
          <span class="comic-number">04</span><b class="comic-chapter">修好，再出发</b>
          <div class="comic-scene"><i class="comic-battery comic-battery--old">10%</i><i class="comic-battery comic-battery--new">100%</i><i class="comic-tool"></i><i class="comic-phone comic-phone--patched"><u></u></i><em class="comic-burst">换好了</em></div>
          <p>维修、翻新或转手，让尚能使用的功能继续创造价值。</p>
          <q>“换块电池，我还可以。”</q>
        </article>
        <article class="comic-panel comic-panel--handover" tabindex="0">
          <span class="comic-number">05</span><b class="comic-chapter">带着记录交接</b>
          <div class="comic-scene"><i class="comic-counter"></i><i class="comic-hand comic-hand--left"></i><i class="comic-phone comic-phone--handover"><u></u></i><i class="comic-hand comic-hand--right"></i><em class="comic-ticket-mini">✓ 编号<br>✓ 地点<br>✓ 凭证</em></div>
          <p>正规回收不是消失，而是身份、地点和处理结果都能被追问。</p>
          <q>“请让下一站留下签名。”</q>
        </article>
        <article class="comic-panel comic-panel--rebirth" tabindex="0">
          <span class="comic-number">06</span><b class="comic-chapter">材料的新生</b>
          <div class="comic-scene"><i class="comic-recycle-bin"><u>♻</u></i><i class="comic-phone comic-phone--recycle"><u></u></i><i class="comic-material comic-material--one"></i><i class="comic-material comic-material--two"></i><i class="comic-material comic-material--three"></i><i class="comic-new-device"></i><em class="comic-burst">材料回来了</em></div>
          <p>金属、玻璃和塑料回到生产链，旧设备以另一种形态继续生活。</p>
          <q>“我的一生，不该止于垃圾桶。”</q>
        </article>
      </div>
      <footer class="comic-colophon"><span><i>HOVER</i> 悬停一格，看看真实动作如何发生</span><b>KEEP IT IN THE LOOP →</b></footer>`;
  }

  function diagnosticDashboard() {
    const host = q('#chainDiagnosticDashboard');
    if (!host) return;
    majorLayout(host, true);
    host.className = 'interactive-archive-board';
    host.innerHTML = `
      <header class="archive-folder-head">
        <div class="archive-case-tab"><small>CASE FILE</small><b>7E–19–204</b></div>
        <div class="archive-headline"><span>CHAIN OF CUSTODY / 责任链取证</span><h3>从档案袋中，逐份抽出设备的一生</h3></div>
        <em id="archiveStatusStamp">PROOF SEALED</em>
      </header>
      <div class="archive-workbench">
        <section class="archive-file-stage" aria-label="可翻阅的设备档案袋">
          <article class="archive-open-file" id="archiveOpenFile" aria-live="polite">
            <header>
              <span><small id="archiveDocType">04 / TERMINAL PROOF</small><b id="archiveDocCode">DOC · 88D0</b></span>
              <em id="archiveDocState">已封存</em>
            </header>
            <div class="archive-paper-title"><span id="archiveDocNumber">04</span><div><small>TRACE RECORD</small><h4 id="archiveDocTitle">处理凭证</h4></div></div>
            <p id="archiveDocSummary">检测、数据清除与材料去向必须落在同一设备编号下，责任链才抵达真实末端。</p>
            <div class="archive-doc-rows" id="archiveDocRows"></div>
            <div class="archive-photo-strip" aria-label="当前档案的两张中国现场照片">
              <figure><img src="assets/archive-proof-dismantling-guiyu.jpg" alt="广东贵屿规范拆解企业分拣电子元件"><figcaption><b>贵屿规范拆解</b><span>PROOF / 01</span></figcaption></figure>
              <figure><img src="assets/archive-proof-recycling-line-alt.jpg" alt="中国正规废旧家电处理厂生产线"><figcaption><b>正规处理线</b><span>PROOF / 02</span></figcaption></figure>
            </div>
            <footer><span>SAME DEVICE ID</span><i></i><span>ORDERED TIME</span><i></i><span>READABLE FILE</span></footer>
          </article>
          <div class="archive-folder-pocket">
            <div class="archive-file-tabs" role="tablist" aria-label="选择要从档案袋中抽出的文件">
              <button type="button" data-archive-file="identity" role="tab" aria-selected="false"><small>FILE 01</small><b>设备身份</b><em>ID</em></button>
              <button type="button" data-archive-file="owner" role="tab" aria-selected="false"><small>FILE 02</small><b>所有权</b><em>OWNER</em></button>
              <button type="button" data-archive-file="place" role="tab" aria-selected="false"><small>FILE 03</small><b>交接地点</b><em>PLACE</em></button>
              <button type="button" class="active" data-archive-file="proof" role="tab" aria-selected="true"><small>FILE 04</small><b>处理凭证</b><em>PROOF</em></button>
            </div>
            <div class="archive-pocket-face"><span><small>DEVICE ARCHIVE</small><b>7E–19–204</b></span><em>悬停一份，完整抽出</em><i>4 RECORDS</i></div>
          </div>
        </section>
        <aside class="archive-verifier" aria-live="polite">
          <header><span>LIVE FILE VERIFIER</span><b id="archiveCaseState">PROOF SEALED</b></header>
          <div class="archive-code"><i></i><span id="archiveChecksum">7E19 / 204F / C6A2 / 88D0</span></div>
          <small class="archive-now-reading">NOW READING / 当前文件</small>
          <h4 id="archiveCaseName">处理凭证</h4>
          <p id="archiveCaseCopy">前三份文件回答“它是谁、交给谁、在哪里”，最后一份文件说明它最终经历了什么。</p>
          <div class="archive-custody-rail" aria-label="随文件同步点亮的责任链">
            <div data-archive-node="0"><i></i><span><b>身份建立</b><small>ID CREATED</small></span></div>
            <div data-archive-node="1"><i></i><span><b>主体签收</b><small>OWNER SIGNED</small></span></div>
            <div data-archive-node="2"><i></i><span><b>地点留痕</b><small>PLACE RECORDED</small></span></div>
            <div data-archive-node="3"><i></i><span><b>结果封存</b><small>PROOF SEALED</small></span></div>
          </div>
        </aside>
      </div>
      <footer class="archive-meta-row"><div><small>HOW TO READ</small><b>HOVER / FOCUS / TAP</b></div><div><small>RETENTION</small><b>LONGER THAN PLATFORM</b></div><div><small>CHAIN STATUS</small><b id="archiveChainCount">4 / 4 FILES LINKED</b></div></footer>`;

    const models = {
      identity: {
        index: 0, number: '01', type: 'DEVICE IDENTITY', code: 'DOC · 7E19', state: 'ID MATCHED', stateCn: '身份已匹配', title: '设备身份',
        summary: '不是“某台旧手机”，而是可被持续辨认的同一台设备；统一编号让此后的每份记录都有明确归属。',
        verifier: '型号、序列号和资产编号共同锁定设备身份，后续文件才能确认属于同一台设备。', checksum: '7E19 / A113 / SN88 / ID01',
        rows: [['设备型号', 'HUST·1037'], ['序列号', 'SN-024-7E65'], ['资产编号', 'ASSET-1037']],
        photos: [
          ['assets/archive-id-shop-shanghai.jpg', '上海爱回收与京东手机服务站内的设备验机现场', '上海门店验机', 'IDENTITY / 01'],
          ['assets/archive-id-platform-beijing.jpg', '北京爱回收智能手机回收平台', '北京回收平台', 'IDENTITY / 02']
        ]
      },
      owner: {
        index: 1, number: '02', type: 'OWNERSHIP TRANSFER', code: 'DOC · 204F', state: 'OWNER SIGNED', stateCn: '主体已签收', title: '所有权',
        summary: '设备离开原持有人时，新的接收主体与签收时间同时出现，责任不会停留在一句模糊的“已转手”。',
        verifier: '原持有人、接收主体和转移时间共同证明责任在何时、从谁手中转移给谁。', checksum: '7E19 / 204F / OWN2 / T132',
        rows: [['原持有人', 'USER · 019'], ['接收主体', 'RECYCLE · 06'], ['转移时间', '7.10，10：37']],
        photos: [
          ['assets/archive-owner-station-wuhan.jpg', '武汉回收站工作人员现场登记交接信息', '武汉站点登记', 'OWNER / 01'],
          ['assets/archive-owner-site-wuhan.jpg', '武汉再生资源回收站开展现场交接', '武汉站点交接', 'OWNER / 02']
        ]
      },
      place: {
        index: 2, number: '03', type: 'HANDOVER LOCATION', code: 'DOC · C6A2', state: 'PLACE RECORDED', stateCn: '地点已留痕', title: '交接地点',
        summary: '地址、经手人与回执编号把一次线下交接固定在现实世界中，让设备的移动轨迹可以被复核。',
        verifier: '交接地点不是背景信息；它把设备、时间和经手人连接成可回查的现实坐标。', checksum: '7E19 / C6A2 / LOC3 / RCPT',
        rows: [['交接地址', '武汉洪山区服务站'], ['经手人员', 'OPERATOR · LIN'], ['回执编号', 'RCPT–C6A2–31']],
        photos: [
          ['assets/archive-place-station-wuhan.jpg', '武汉回收站工作人员核查消防与站点条件', '站点安全核查', 'PLACE / 01'],
          ['assets/archive-place-inspection-wuhan.jpg', '武汉社区再生资源回收站与收运车辆', '武汉社区回收站', 'PLACE / 02']
        ]
      },
      proof: {
        index: 3, number: '04', type: 'TERMINAL PROOF', code: 'DOC · 88D0', state: 'PROOF SEALED', stateCn: '结果已封存', title: '处理凭证',
        summary: '检测、数据清除与材料去向必须落在同一设备编号下，责任链才抵达真实末端。',
        verifier: '前三份文件回答“它是谁、交给谁、在哪里”，最后一份文件说明它最终经历了什么。', checksum: '7E19 / 204F / C6A2 / 88D0',
        rows: [['检测结果', 'BATTERY · 71%'], ['数据状态', 'ERASED · VERIFIED'], ['材料去向', 'PLANT · SH–04']],
        photos: [
          ['assets/archive-proof-dismantling-guiyu.jpg', '广东贵屿规范拆解企业分拣电子元件', '贵屿规范拆解', 'PROOF / 01'],
          ['assets/archive-proof-recycling-line-alt.jpg', '中国正规废旧家电处理厂生产线', '正规处理线', 'PROOF / 02']
        ]
      }
    };

    Object.values(models).flatMap((model) => model.photos).forEach(([src]) => {
      const image = new Image();
      image.src = src;
    });

    const renderFile = (key, animate = true, reveal = true) => {
      const model = models[key];
      const paper = q('#archiveOpenFile', host);
      qa('[data-archive-file]', host).forEach((item) => {
          const active = item.dataset.archiveFile === key;
          item.classList.toggle('active', active);
          item.setAttribute('aria-selected', String(active));
      });
      if (animate) {
        paper.classList.remove('is-opening');
        void paper.offsetWidth;
        paper.classList.add('is-opening');
      }
      paper.classList.toggle('is-revealed', reveal);
      q('#archiveDocType', host).textContent = `${model.number} / ${model.type}`;
      q('#archiveDocCode', host).textContent = model.code;
      q('#archiveDocState', host).textContent = model.stateCn;
      q('#archiveDocNumber', host).textContent = model.number;
      q('#archiveDocTitle', host).textContent = model.title;
      q('#archiveDocSummary', host).textContent = model.summary;
      q('#archiveDocRows', host).innerHTML = model.rows.map(([label, value], index) => `<div><em>0${index + 1}</em><span><small>${label}</small><b>${value}</b></span><i>✓</i></div>`).join('');
      q('.archive-photo-strip', host).innerHTML = model.photos.map(([src, alt, label, meta]) => `<figure><img src="${src}" alt="${alt}"><figcaption><b>${label}</b><span>${meta}</span></figcaption></figure>`).join('');
      q('#archiveStatusStamp', host).textContent = model.state;
      q('#archiveCaseState', host).textContent = model.state;
      q('#archiveCaseName', host).textContent = model.title;
      q('#archiveCaseCopy', host).textContent = model.verifier;
      q('#archiveChecksum', host).textContent = model.checksum;
      q('#archiveChainCount', host).textContent = `${model.index + 1} / 4 FILES LINKED`;
      qa('[data-archive-node]', host).forEach((node, index) => {
        node.classList.toggle('on', index <= model.index);
        node.classList.toggle('current', index === model.index);
      });
    };

    qa('[data-archive-file]', host).forEach((button) => {
      const selectFile = () => renderFile(button.dataset.archiveFile);
      button.addEventListener('mouseenter', selectFile);
      button.addEventListener('focus', selectFile);
      button.addEventListener('click', selectFile);
    });
    const fileStage = q('.archive-file-stage', host);
    fileStage.addEventListener('mouseleave', () => q('#archiveOpenFile', host).classList.remove('is-revealed'));
    fileStage.addEventListener('focusout', (event) => {
      if (!fileStage.contains(event.relatedTarget)) q('#archiveOpenFile', host).classList.remove('is-revealed');
    });
    renderFile('proof', false, false);
    if (window.location.hash === '#chainDiagnosticDashboard') {
      window.setTimeout(() => host.scrollIntoView({ block: 'center' }), 80);
    }
  }

  function evidenceArchitecture() {
    const host = q('#evidenceArchitecture');
    if (!host) return;
    host.className = 'v53-evidence-console';
    host.innerHTML = `
      <header class="v53-evidence-head">
        <div><span>EVIDENCE CONTROL / 三项证据核验台</span><h3>把一次交接拆成三道可以复查的关口</h3></div>
        <strong><b id="v53EvidenceCount">0</b><small>/ 3 已核验</small></strong>
      </header>
      <div class="v53-evidence-switches" role="group" aria-label="选择要核验的交接证据">
        <button type="button" data-proof="owner" aria-pressed="false"><em>01</em><span><b>谁接手？</b><small>企业全称 · 联系人 · 可查询资质</small></span><i>待核验</i></button>
        <button type="button" data-proof="place" aria-pressed="false"><em>02</em><span><b>在哪里？</b><small>交接时间 · 具体地点 · 回执编号</small></span><i>待核验</i></button>
        <button type="button" data-proof="method" aria-pressed="false"><em>03</em><span><b>怎么处理？</b><small>数据清除 · 功能检测 · 材料去向</small></span><i>待核验</i></button>
      </div>
      <div class="v53-evidence-grid">
        <section class="v53-evidence-ledger">
          <header><span>RECORD PACKAGE</span><b>交接记录包</b></header>
          <div data-ledger="owner"><em>01</em><span><small>主体记录</small><b>接收主体尚未确认</b></span><i></i></div>
          <div data-ledger="place"><em>02</em><span><small>位置记录</small><b>交接坐标尚未确认</b></span><i></i></div>
          <div data-ledger="method"><em>03</em><span><small>处理记录</small><b>末端方式尚未确认</b></span><i></i></div>
          <footer><span>同一设备编号</span><i></i><span>连续时间顺序</span><i></i><span>可带走副本</span></footer>
        </section>
        <section class="v53-evidence-network">
          <header><span>LINK ANALYSIS</span><b>三点互证网络</b></header>
          <svg viewBox="0 0 640 320" role="img" aria-label="接收主体、交接地点和处理方式围绕同一台设备形成三角核验网络">
            <path class="v53-network-edge owner-place" d="M160 82 L480 82"/>
            <path class="v53-network-edge place-method" d="M480 82 L320 252"/>
            <path class="v53-network-edge method-owner" d="M320 252 L160 82"/>
            <path class="v53-network-spoke owner" d="M160 82 L320 148"/>
            <path class="v53-network-spoke place" d="M480 82 L320 148"/>
            <path class="v53-network-spoke method" d="M320 252 L320 148"/>
            <g data-evidence-node="owner"><circle cx="160" cy="82" r="48"/><text x="160" y="76">主体</text><text x="160" y="98">WHO</text></g>
            <g data-evidence-node="place"><circle cx="480" cy="82" r="48"/><text x="480" y="76">位置</text><text x="480" y="98">WHERE</text></g>
            <g data-evidence-node="method"><circle cx="320" cy="252" r="48"/><text x="320" y="246">处理</text><text x="320" y="268">HOW</text></g>
            <g class="v53-device-node"><circle cx="320" cy="148" r="55"/><text x="320" y="143">HUST·1037</text><text x="320" y="166">SAME DEVICE</text></g>
          </svg>
          <p id="v53EvidenceSummary">点击三道关口，让主体、地点与处理共同指向同一台设备。</p>
        </section>
        <aside class="v53-evidence-output">
          <header><span>AUDIT OUTPUT</span><b id="v53EvidenceState">WAITING</b></header>
          <strong id="v53EvidenceOutput">记录尚未闭合</strong>
          <p id="v53EvidenceCopy">当前还不能确认设备离开用户之后由谁负责、在哪里停留、最终经历了什么。</p>
          <div class="v53-proof-bars">
            <div data-evidence-bar="owner"><span>接收主体</span><i><em></em></i><b>0%</b></div>
            <div data-evidence-bar="place"><span>交接位置</span><i><em></em></i><b>0%</b></div>
            <div data-evidence-bar="method"><span>处理凭证</span><i><em></em></i><b>0%</b></div>
          </div>
          <div class="v53-evidence-outcomes"><span>可追问</span><span>可复核</span><span>可归责</span></div>
        </aside>
      </div>
      <footer class="v53-evidence-sequence"><span>交接发生</span><i></i><span>主体签收</span><i></i><span>地点留痕</span><i></i><span>处理回执</span><i></i><b>责任闭环</b></footer>`;
    const selected = new Set();
    const proofModels = {
      owner: { label: '接收主体', ledger: 'RECYCLE · 06 / 主体已签收', summary: '接收主体可核验，责任有了明确起点。' },
      place: { label: '交接位置', ledger: '武汉洪山区服务站 / 地点已留痕', summary: '交接地点与时间可核验，设备的移动不再是模糊终点。' },
      method: { label: '处理凭证', ledger: 'ERASED · VERIFIED / 结果已封存', summary: '处理方式与材料去向可核验，责任抵达真实末端。' }
    };
    const renderEvidence = () => {
      const count = selected.size;
      q('#v53EvidenceCount', host).textContent = count;
      qa('[data-proof]', host).forEach((button) => {
        const active = selected.has(button.dataset.proof);
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
        q('i', button).textContent = active ? '已核验' : '待核验';
      });
      Object.entries(proofModels).forEach(([key, model]) => {
        const active = selected.has(key);
        const ledger = q(`[data-ledger="${key}"]`, host);
        ledger.classList.toggle('active', active);
        q('span b', ledger).textContent = active ? model.ledger : `${model.label}尚未确认`;
        q(`[data-evidence-node="${key}"]`, host).classList.toggle('active', active);
        const bar = q(`[data-evidence-bar="${key}"]`, host);
        bar.classList.toggle('active', active);
        q('b', bar).textContent = active ? '100%' : '0%';
      });
      const activeLabels = [...selected].map((key) => proofModels[key].label);
      q('#v53EvidenceSummary', host).textContent = count ? `已核验：${activeLabels.join('、')}。继续补齐剩余关口。` : '点击三道关口，让主体、地点与处理共同指向同一台设备。';
      q('#v53EvidenceState', host).textContent = count === 3 ? 'CHAIN CLOSED' : count ? 'VERIFYING' : 'WAITING';
      q('#v53EvidenceOutput', host).textContent = count === 3 ? '三项证据已经闭合' : count === 2 ? '只差最后一处确认' : count === 1 ? '责任链刚刚建立' : '记录尚未闭合';
      q('#v53EvidenceCopy', host).textContent = count === 3 ? '主体、地点与处理结果共用同一设备编号和时间顺序，交接可以被追问、复核并最终归责。' : count ? `当前已有 ${count} 项记录可查，仍有 ${3 - count} 项信息可能让设备在下一次转手时失去身份。` : '当前还不能确认设备离开用户之后由谁负责、在哪里停留、最终经历了什么。';
      qa('.v53-evidence-outcomes span', host).forEach((item, index) => item.classList.toggle('active', count > index));
      qa('.v53-evidence-sequence span', host).forEach((item, index) => item.classList.toggle('active', index <= count));
      q('.v53-evidence-sequence b', host).classList.toggle('active', count === 3);
      host.classList.toggle('complete', count === 3);
    };
    qa('[data-proof]', host).forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.dataset.proof;
        selected.has(key) ? selected.delete(key) : selected.add(key);
        renderEvidence();
      });
    });
    renderEvidence();
  }

  function mazeScene() {
    const host = q('#ewasteMaze');
    if (!host) return;
    host.className = 'v57-ewaste-maze';
    host.innerHTML = `
      <div class="v53-maze-stage v54-maze-stage v57-maze-stage" role="button" tabindex="0" aria-label="拟真的电子废弃物持续落入迷宫；点击可以短暂加速堆积，让路径逐渐变得复杂">
        <img src="assets/images/ewaste-maze-3d-v2-4k.jpg" alt="小人面对由大量电子废弃物堆叠而成、上方可见天空的庞大三维迷宫" loading="lazy" decoding="async">
        <canvas class="v54-ewaste-rain" aria-hidden="true"></canvas>
        <div class="v54-maze-growth" aria-hidden="true"></div>
        <div class="v53-maze-depth" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <div class="v53-maze-signals" aria-hidden="true"><span>身份是否还在？</span><span>下一站在哪里？</span><span>谁保存处理结果？</span></div>
        <div class="v54-maze-status" aria-live="polite"><span>PATH COMPLEXITY / 路径复杂度</span><b>12%</b><small>0 件废弃物已落入</small></div>
        <div class="v53-maze-caption"><small>TRACE ENTRY / 电子废弃物迷宫</small><strong>入口很容易找到，出口必须被证明。</strong><span>每一件电子废弃物都会从天空坠入并留在路径上；点击画面，可让堆积短暂加速。</span></div>
      </div>`;
    const stage = q('.v54-maze-stage', host);
    const canvas = q('.v54-ewaste-rain', host);
    const growth = q('.v54-maze-growth', host);
    const status = q('.v54-maze-status b', host);
    const statusCount = q('.v54-maze-status small', host);
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const drops = [];
    const spriteSources = [
      'assets/images/ewaste-drop-phone.png',
      'assets/images/ewaste-drop-monitor.png',
      'assets/images/ewaste-drop-laptop.png',
      'assets/images/ewaste-drop-keyboard.png',
      'assets/images/ewaste-drop-board.png',
      'assets/images/ewaste-drop-cables.png'
    ];
    const sprites = spriteSources.map((src) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = src;
      return image;
    });
    const spriteWidths = [3.5, 5.6, 6.8, 7.2, 5.4, 6.2];
    const spriteMinWidths = [22, 36, 44, 46, 32, 38];
    const spriteMaxWidths = [58, 92, 112, 116, 86, 98];
    const landingMap = [
      [47, 45, -7], [54, 47, 6], [39, 50, 11], [62, 51, -10], [48, 54, 7], [57, 56, -5],
      [32, 58, -14], [68, 59, 12], [42, 62, 8], [60, 64, -8], [36, 67, 13], [70, 68, -11],
      [48, 69, -4], [56, 72, 8], [28, 72, -16], [75, 74, 11], [42, 76, 6], [64, 77, -9]
    ];
    let visible = true;
    let lastTime = 0;
    let lastSpawn = 0;
    let landedCount = 0;
    let spawnedCount = 0;
    let boostedUntil = 0;

    const resizeCanvas = () => {
      const rect = stage.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * ratio));
      canvas.height = Math.max(1, Math.round(rect.height * ratio));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const widthFor = (type, depth) => {
      const depthScale = .64 + Math.max(0, Math.min(1, (depth - 43) / 36)) * .72;
      return spriteWidths[type] * depthScale;
    };

    const pixelWidthFor = (type, depth, stageWidth) => Math.max(
      spriteMinWidths[type],
      Math.min(spriteMaxWidths[type], stageWidth * widthFor(type, depth) / 100)
    );

    const targetFor = (item) => {
      const [left, top, rotation] = landingMap[item.targetIndex];
      if (!item.layer) return [left, top, rotation];
      const horizontalShift = ((item.targetIndex % 3) - 1) * item.layer * .72;
      const verticalShift = item.layer * .36;
      const rotationShift = (item.targetIndex % 2 ? 1 : -1) * item.layer * 2.2;
      return [left + horizontalShift, top + verticalShift, rotation + rotationShift];
    };

    const spawnDrop = (burst = false) => {
      const rect = stage.getBoundingClientRect();
      if (!rect.width || drops.length >= (burst ? 7 : 5)) return;
      const targetIndex = spawnedCount % landingMap.length;
      const layer = Math.floor(spawnedCount / landingMap.length) % 3;
      spawnedCount += 1;
      const target = landingMap[targetIndex];
      const type = targetIndex % sprites.length;
      drops.push({
        type,
        targetIndex,
        layer,
        progress: burst ? Math.random() * .08 : 0,
        duration: burst ? 2.9 + Math.random() * .85 : 3.2 + Math.random() * 1.25,
        startX: target[0] + (Math.random() - .5) * (burst ? 14 : 22),
        startRotation: (Math.random() - .5) * 1.2,
        spin: (Math.random() > .5 ? 1 : -1) * (1.1 + Math.random() * 1.4) * Math.PI,
        sway: (Math.random() - .5) * (burst ? 34 : 48)
      });
    };

    const drawDevice = (item, progress, rect) => {
      const image = sprites[item.type];
      if (!image.complete || !image.naturalWidth) return;
      const [targetX, targetY, targetRotation] = targetFor(item);
      const finalWidth = pixelWidthFor(item.type, targetY, rect.width);
      const finalHeight = finalWidth * image.naturalHeight / image.naturalWidth;
      const fall = Math.pow(progress, 2.45);
      const steer = progress * progress * (3 - 2 * progress);
      const settle = Math.max(0, Math.min(1, (progress - .78) / .22));
      const startY = -finalHeight * 1.15;
      const wind = Math.sin(progress * Math.PI) * item.sway * (1 - settle);
      const x = rect.width * (item.startX + (targetX - item.startX) * steer) / 100 + wind;
      const y = startY + (rect.height * targetY / 100 - startY) * fall;
      const scale = .42 + fall * .58;
      const width = finalWidth * scale;
      const height = finalHeight * scale;
      const freeRotation = item.startRotation + item.spin * progress;
      const rotation = freeRotation * (1 - settle) + targetRotation * Math.PI / 180 * settle;
      const speedBlur = Math.max(0, Math.min(.72, progress * (1 - settle) * .82));
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = .92 + fall * .08;
      ctx.shadowColor = 'rgba(0, 0, 0, .72)';
      ctx.shadowBlur = 5 + fall * 12;
      ctx.shadowOffsetY = 3 + fall * 8;
      ctx.filter = `brightness(${.82 + fall * .16}) saturate(${.78 + fall * .18}) contrast(1.1) blur(${speedBlur}px)`;
      ctx.drawImage(image, -width / 2, -height / 2, width, height);
      ctx.restore();
    };

    const addImpact = (left, top) => {
      const impact = document.createElement('i');
      impact.className = 'v57-maze-impact';
      impact.style.left = `${left}%`;
      impact.style.top = `${top}%`;
      growth.appendChild(impact);
      impact.addEventListener('animationend', () => impact.remove(), { once: true });
    };

    const settleDrop = (item) => {
      const [left, top, rotation] = targetFor(item);
      const existingDebris = growth.querySelectorAll('.v56-maze-debris');
      if (existingDebris.length >= 52) existingDebris[0].remove();
      const debris = document.createElement('img');
      debris.className = 'v56-maze-debris';
      debris.src = spriteSources[item.type];
      debris.alt = '';
      debris.decoding = 'async';
      debris.style.left = `${left}%`;
      debris.style.top = `${top}%`;
      debris.style.width = `clamp(${spriteMinWidths[item.type]}px, ${widthFor(item.type, top)}%, ${spriteMaxWidths[item.type]}px)`;
      debris.style.zIndex = String(Math.round(top * 10));
      debris.style.setProperty('--debris-rotation', `${rotation}deg`);
      debris.style.setProperty('--debris-depth', `${Math.max(.7, Math.min(1.08, .68 + (top - 42) / 90))}`);
      growth.appendChild(debris);
      requestAnimationFrame(() => debris.classList.add('is-settled'));
      addImpact(left, top);
      landedCount += 1;
      const complexity = Math.min(96, Math.round(12 + landedCount * 2.5));
      status.textContent = `${complexity}%`;
      statusCount.textContent = `${landedCount} 件废弃物已落入`;
      status.parentElement.setAttribute('aria-label', `路径复杂度 ${complexity}%，已有 ${landedCount} 件电子废弃物落入迷宫`);
      stage.classList.toggle('is-complex', landedCount >= 7);
      stage.classList.toggle('is-labyrinth', landedCount >= 30);
    };

    const burst = () => {
      boostedUntil = performance.now() + 2800;
      for (let i = 0; i < 2; i += 1) spawnDrop(true);
    };

    const draw = (time) => {
      if (!visible) { requestAnimationFrame(draw); return; }
      const rect = stage.getBoundingClientRect();
      const dt = Math.min(36, time - (lastTime || time)) / 1000;
      lastTime = time;
      const boosted = time < boostedUntil;
      const spawnEvery = boosted ? 1500 : 2100;
      if (time - lastSpawn > spawnEvery) { spawnDrop(boosted); lastSpawn = time; }
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (let i = drops.length - 1; i >= 0; i -= 1) {
        const item = drops[i];
        const sprite = sprites[item.type];
        if (!sprite.complete || !sprite.naturalWidth) continue;
        item.progress = Math.min(1, item.progress + dt / (boosted ? item.duration * .78 : item.duration));
        drawDevice(item, item.progress, rect);
        if (item.progress >= 1) {
          drops.splice(i, 1);
          settleDrop(item);
        }
      }
      requestAnimationFrame(draw);
    };

    resizeCanvas();
    for (let i = 0; i < 4; i += 1) {
      spawnDrop(false);
      if (drops[i]) drops[i].progress = .06 + i * .12;
    }
    if (!reduceMotion) requestAnimationFrame(draw);
    else {
      drops.splice(0);
      for (let i = 0; i < 4; i += 1) settleDrop({ type: i % sprites.length, targetIndex: i });
    }

    if ('ResizeObserver' in window) new ResizeObserver(resizeCanvas).observe(stage);
    if ('IntersectionObserver' in window) new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: .05 }).observe(stage);
    stage.addEventListener('pointermove', (event) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      stage.style.setProperty('--maze-x', `${x * -22}px`);
      stage.style.setProperty('--maze-y', `${y * -12}px`);
      stage.style.setProperty('--maze-tilt-x', `${y * -1.4}deg`);
      stage.style.setProperty('--maze-tilt-y', `${x * 2.2}deg`);
    });
    stage.addEventListener('pointerleave', () => {
      stage.style.setProperty('--maze-x', '0px');
      stage.style.setProperty('--maze-y', '0px');
      stage.style.setProperty('--maze-tilt-x', '0deg');
      stage.style.setProperty('--maze-tilt-y', '0deg');
    });
    stage.addEventListener('click', burst);
    stage.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      burst();
    });
  }

  function init() {
    routeDashboard();
    diagnosticDashboard();
    evidenceArchitecture();
    mazeScene();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
