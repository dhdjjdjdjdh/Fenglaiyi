(() => {
  const normalize = (value = "") => value
    .replace(/\s+/g, "")
    .replace(/[，,。；;：:！!？?]/g, "");

  const target = normalize("离开用户之后，设备开始进入多重规则");

  const findHeading = () => {
    const preferred = document.querySelectorAll(
      "h1, h2, h3, h4, [class*='headline'], [class*='title'], [class*='heading']"
    );
    const match = [...preferred].find((element) => {
      const text = normalize(element.textContent);
      return text === target || (text.includes(target) && text.length <= target.length + 4);
    });
    if (match) return match;

    return [...document.querySelectorAll("main div, main section, body > div")].find((element) => {
      const text = normalize(element.textContent);
      return element.children.length <= 4
        && (text === target || (text.includes(target) && text.length <= target.length + 4));
    });
  };

  const findCopyColumn = (heading) => {
    let candidate = heading.parentElement;
    for (let depth = 0; candidate && depth < 7; depth += 1) {
      const paragraphs = candidate.querySelectorAll("p");
      const parentHasPeer = candidate.parentElement && candidate.parentElement.children.length >= 2;
      if (paragraphs.length >= 2 && parentHasPeer) return candidate;
      candidate = candidate.parentElement;
    }
    return heading.parentElement;
  };

  const syncTypography = () => {
    const heading = findHeading();
    if (!heading) return;

    const copy = findCopyColumn(heading);
    const split = copy && copy.parentElement;
    heading.classList.add("afterlife-sync-title");
    copy.classList.add("afterlife-sync-copy");
    copy.querySelectorAll("p").forEach((paragraph) => {
      paragraph.classList.add("afterlife-sync-body");
    });

    if (!split) return;
    split.classList.add("afterlife-sync-split");
    const display = getComputedStyle(split).display;
    split.classList.add(display.includes("grid") ? "afterlife-sync-grid" : "afterlife-sync-flex");
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncTypography, { once: true });
  } else {
    syncTypography();
  }
})();
