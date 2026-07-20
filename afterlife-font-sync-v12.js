(() => {
  const normalize = (value) => (value || "").replace(/[\s“”‘’'\"，。！？、；：]/g, "");

  const targets = {
    title: "离开用户之后设备开始进入多重规则",
    paragraphs: [
      "一台设备被交出去只能证明原持有人不再使用它",
      "可靠的去向并不由一句已回收决定",
      "下方数据舱不是统计比例而是一张路径审计模型"
    ]
  };

  const findSmallest = (needle) => {
    const normalizedNeedle = normalize(needle);
    const matches = [...document.querySelectorAll("body *")].filter((element) =>
      normalize(element.textContent).includes(normalizedNeedle)
    );
    return matches.sort((a, b) => a.querySelectorAll("*").length - b.querySelectorAll("*").length)[0];
  };

  const lockType = (element, className, desktopSize, mobileSize, lineHeight, weight) => {
    if (!element) return;
    const size = window.matchMedia("(max-width: 1099px)").matches ? mobileSize : desktopSize;
    element.classList.add(className);
    [element, ...element.querySelectorAll("*")].forEach((node) => {
      node.style.setProperty("font-size", size, "important");
      node.style.setProperty("line-height", lineHeight, "important");
      node.style.setProperty("letter-spacing", "0", "important");
      node.style.setProperty("word-break", "normal", "important");
      node.style.setProperty("overflow-wrap", "normal", "important");
      if (!node.matches("strong, b, mark")) {
        node.style.setProperty("font-weight", weight, "important");
      }
    });
  };

  const applyTypography = () => {
    const titleMatch = findSmallest(targets.title);
    const title = titleMatch?.closest("h1, h2, h3, [role='heading']") || titleMatch;
    lockType(title, "afterlife-type-title", "56px", "38px", "1.12", "800");

    targets.paragraphs.forEach((text) => {
      const match = findSmallest(text);
      const paragraph = match?.closest("p") || match;
      lockType(paragraph, "afterlife-type-body", "22px", "18px", "1.78", "400");
    });
  };

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyTypography();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyTypography, { once: true });
  } else {
    applyTypography();
  }
  window.addEventListener("load", applyTypography, { once: true });
  window.addEventListener("resize", schedule);
  [80, 240, 700, 1500].forEach((delay) => window.setTimeout(applyTypography, delay));

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 5000);
})();
