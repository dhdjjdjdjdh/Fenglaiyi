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
    host.className = 'v37-dashboard v37-route-dashboard';
    host.innerHTML = `
      <header class="v37-dash-head">
        <div>
          <span class="v37-kicker">ROUTE LEDGER / 去向总览数据舱</span>
          <h3>离开用户之后，责任沿哪条线移动？</h3>
        </div>
        <span class="v37-meta">编辑部路径审计模型</span>
      </header>
      <section class="v37-metric-strip" aria-label="路径总览">
        <div><strong>04</strong><span>种常见去向</span></div>
        <div><strong>03</strong><span>处关键核验</span></div>
        <div><strong>01</strong><span>条连续账本</span></div>
        <div><strong>00</strong><span>步可以省略</span></div>
      </section>
      <div class="v37-route-board">
        <aside class="v37-mini-stack" aria-label="去向小图表">
          <article>
            <header><b>记录完整度</b><small>从交接到末端</small></header>
            <svg viewBox="0 0 260 90" role="img" aria-label="四类去向记录完整度折线图">
              <path class="grid" d="M8 18H252M8 45H252M8 72H252"/>
              <path class="line lime" d="M12 66 C52 58 77 48 112 44 S177 25 248 16"/>
              <circle cx="12" cy="66" r="4"/><circle cx="112" cy="44" r="4"/><circle cx="248" cy="16" r="4"/>
            </svg>
            <div class="v37-axis"><span>离开用户</span><span>末端处理</span></div>
          </article>
          <article>
            <header><b>四种去向</b><small>风险并不等长</small></header>
            <div class="v37-radial-mini">
              <i style="--p:84;--c:#c5f500"><span>正规</span></i>
              <i style="--p:61;--c:#6d929c"><span>二手</span></i>
              <i style="--p:43;--c:#ffb000"><span>闲置</span></i>
              <i style="--p:18;--c:#e85d38"><span>未记</span></i>
            </div>
          </article>
          <article>
            <header><b>三项证据</b><small>缺一即断链</small></header>
            <div class="v37-proof-bars"><i style="--w:92%"></i><i style="--w:71%"></i><i style="--w:48%"></i></div>
            <div class="v37-proof-labels"><span>主体</span><span>地点</span><span>处理</span></div>
          </article>
        </aside>
        <main class="v37-route-flow">
          <div class="v37-device-node"><span>OLD DEVICE</span><b>旧设备</b><small>离开原持有人</small></div>
          <div class="v37-route-lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
          <div class="v37-route-list">
            <button data-route="闲置"><em>01</em><b>闲置</b><small>停在原处，位置清楚但尚未交接</small></button>
            <button data-route="二手 / 维修"><em>02</em><b>二手 / 维修</b><small>设备延寿，责任在转手处重新起算</small></button>
            <button class="active" data-route="正规回收"><em>03</em><b>正规回收</b><small>主体、检测和末端凭证可以互证</small></button>
            <button data-route="未记录"><em>04</em><b>未记录</b><small>去向消失，风险与责任同时变模糊</small></button>
          </div>
        </main>
        <aside class="v37-current-audit">
          <span>当前审计</span>
          <h4 id="v37RouteName">正规回收</h4>
          <p id="v37RouteText">接收主体、位置与处理凭证可查，设备身份贯穿交接、检测与材料去向。</p>
          <div class="v37-audit-checks"><i class="on">主体</i><i class="on">地点</i><i class="on">处理</i></div>
        </aside>
      </div>`;

    const details = {
      '闲置': ['设备停留在家庭或机构内，位置仍可知，但没有正式接收主体，也没有末端处理记录。', [1, 0, 0]],
      '二手 / 维修': ['设备被转卖、维修或翻新后继续使用；延寿有价值，但转手时间、接收者和未来去向必须留下记录。', [1, 1, 0]],
      '正规回收': ['接收主体、位置与处理凭证可查，设备身份贯穿交接、检测与材料去向。', [1, 1, 1]],
      '未记录': ['设备可能混入普通废物流或分散拆解链，位置、处理方法和材料去向均难以复核。', [0, 0, 0]]
    };
    qa('.v37-route-list button', host).forEach((button) => {
      button.addEventListener('click', () => {
        qa('.v37-route-list button', host).forEach((item) => item.classList.toggle('active', item === button));
        const name = button.dataset.route;
        q('#v37RouteName').textContent = name;
        q('#v37RouteText').textContent = details[name][0];
        qa('.v37-audit-checks i', host).forEach((item, index) => item.classList.toggle('on', Boolean(details[name][1][index])));
      });
    });
  }

  function diagnosticDashboard() {
    const host = q('#chainDiagnosticDashboard');
    if (!host) return;
    majorLayout(host, true);
    host.className = 'v37-dashboard v37-diagnostic-dashboard';
    host.innerHTML = `
      <header class="v37-dash-head">
        <div><span class="v37-kicker">TRACE DIAGNOSTICS / 责任链诊断台</span><h3>四项记录，决定一台设备能否被复盘</h3></div>
        <span class="v37-status">链条完整</span>
      </header>
      <section class="v37-diagnostic-kpis">
        <div><strong>4/4</strong><span>信息字段</span></div><div><strong>3/3</strong><span>交叉核验</span></div><div><strong>1</strong><span>设备身份</span></div><div><strong>∞</strong><span>可追溯周期</span></div>
      </section>
      <div class="v37-diagnostic-grid">
        <section class="v37-record-matrix">
          <button class="done"><em>01</em><b>设备身份</b><span>型号 / 序列号 / 唯一标识</span></button>
          <button class="done"><em>02</em><b>所有权</b><span>原持有人 / 接收主体</span></button>
          <button class="done"><em>03</em><b>交接地点</b><span>时间 / 地址 / 凭证编号</span></button>
          <button class="done"><em>04</em><b>处理凭证</b><span>检测 / 数据清除 / 材料去向</span></button>
        </section>
        <section class="v37-process-spine">
          <span>设备</span><i></i><span>交接</span><i></i><span>检测</span><i></i><span>末端</span>
        </section>
        <section class="v37-diagnostic-copy">
          <span>当前路线</span><h4>正规回收</h4>
          <p>四项记录不是四张孤立表格，而是一条可验证的时间线。任何一项缺席，设备就会在下一次转手时失去身份。</p>
          <div class="v37-coverage-bars"><i style="--w:100%"></i><i style="--w:92%"></i><i style="--w:84%"></i><i style="--w:76%"></i></div>
        </section>
        <section class="v37-lower-charts">
          <article><b>字段覆盖</b><div class="v37-ring-row"><i style="--v:94"></i><i style="--v:81"></i><i style="--v:73"></i></div><small>身份 / 地点 / 处理</small></article>
          <article><b>核验进度</b><svg viewBox="0 0 240 70"><path class="grid" d="M5 18H235M5 42H235M5 66H235"/><path class="line lime" d="M8 60 L68 48 L128 38 L188 21 L232 12"/></svg><small>交接越连续，责任越清楚</small></article>
        </section>
      </div>`;
  }

  function evidenceArchitecture() {
    const host = q('#evidenceArchitecture');
    if (!host) return;
    host.className = 'v37-evidence-architecture';
    host.innerHTML = `
      <header><span class="v37-kicker">EVIDENCE ARCHITECTURE / 三项证据架构</span><strong><b id="v37EvidenceCount">0</b>/3 已核验</strong></header>
      <div class="v37-evidence-stage">
        <section class="v37-evidence-side left">
          <h4>责任从哪里开始</h4>
          <button data-proof="owner"><b>谁接手？</b><span>企业全称、联系人与可查询资质</span></button>
          <button data-proof="place"><b>在哪里？</b><span>交接时间、具体地点与凭证编号</span></button>
        </section>
        <section class="v37-evidence-core">
          <div class="v37-core-rings"><i></i><i></i><i></i><strong>交接<br>核验</strong></div>
          <p id="v37EvidenceSummary">逐项点亮三项证据，查看一条责任链如何闭合。</p>
        </section>
        <section class="v37-evidence-side right">
          <h4>责任如何抵达末端</h4>
          <button data-proof="method"><b>怎么处理？</b><span>数据清除、检测、拆解与材料去向</span></button>
          <div class="v37-evidence-output"><small>输出</small><b id="v37EvidenceOutput">记录尚未闭合</b></div>
        </section>
      </div>`;
    const selected = new Set();
    const summaries = {
      owner: '接收主体可核验，责任有了明确起点。',
      place: '交接地点与时间可核验，设备的移动不再是模糊终点。',
      method: '处理方式与材料去向可核验，责任抵达真实末端。'
    };
    qa('[data-proof]', host).forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.dataset.proof;
        selected.has(key) ? selected.delete(key) : selected.add(key);
        button.classList.toggle('active', selected.has(key));
        q('#v37EvidenceCount').textContent = selected.size;
        q('#v37EvidenceSummary').textContent = selected.size ? summaries[key] : '逐项点亮三项证据，查看一条责任链如何闭合。';
        q('#v37EvidenceOutput').textContent = selected.size === 3 ? '形成可追问、复核与归责的证据链' : `仍缺 ${3 - selected.size} 项关键证据`;
        host.classList.toggle('complete', selected.size === 3);
      });
    });
  }

  function mazeScene() {
    const host = q('#ewasteMaze');
    if (!host) return;
    const existing = q('img', host) || qa('img').find((img) => /waste|ewaste|maze|pile|scrap/i.test(img.src));
    const texture = existing ? `url("${existing.src}")` : 'linear-gradient(135deg,#172624,#384944)';
    host.className = 'v37-maze';
    host.style.setProperty('--maze-texture', texture);
    host.innerHTML = `
      <header><span class="v37-kicker">END / 电子废弃物迷宫</span><h3>数字生活的清洁感，不能建立在看不见的脏活上</h3><p>设备离开屏幕之后，会穿过转卖、维修、回收与拆解的多重岔路。缺少连续记录时，我们置身其中，却很难判断哪一条路真正通向合规末端。</p></header>
      <div class="v37-maze-stage" aria-label="由电子废弃物组成的三维迷宫">
        <div class="v37-maze-sky"><span>出口？</span><span>谁接手？</span><span>材料去了哪里？</span></div>
        <div class="v37-maze-floor"></div>
        <div class="v37-wall left l1"></div><div class="v37-wall left l2"></div><div class="v37-wall left l3"></div><div class="v37-wall left l4"></div>
        <div class="v37-wall right r1"></div><div class="v37-wall right r2"></div><div class="v37-wall right r3"></div><div class="v37-wall right r4"></div>
        <div class="v37-cross-wall c1"></div><div class="v37-cross-wall c2"></div><div class="v37-cross-wall c3"></div>
        <div class="v37-person"><i></i><b></b><span></span></div>
        <div class="v37-maze-caption"><strong>你站在路径中央</strong><span>左右移动鼠标，观察被设备高墙遮住的出口。</span></div>
      </div>`;
    const stage = q('.v37-maze-stage', host);
    stage.addEventListener('pointermove', (event) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      stage.style.setProperty('--look-x', `${x * 18}px`);
      stage.style.setProperty('--tilt', `${x * 2.5}deg`);
    });
    stage.addEventListener('pointerleave', () => {
      stage.style.setProperty('--look-x', '0px');
      stage.style.setProperty('--tilt', '0deg');
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
