(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const els = {
    grid: $('#grid'),
    dn: $('#dn'),
    scanmsg: $('#scanmsg'),
    found: $('#found'),
    clk: $('#clk'),
    tick: $('#tick'),
    tot: $('#tot'),
    hist: $('#hist'),
    modal: $('#modal'),
    run: $('#run'),
    dn2: $('#dn2'),
    wb: $('#wb'),
    mt: $('#mt'),
    pc: $('#pc'),
    tr: $('#tr'),
    sg: $('#sg'),
    ms: $('#ms'),
    go: $('#go'),
    again: $('#again'),
    dd: $('#dd'),
    cbv: $('#cbv'),
    rs: $('#rs'),
    rr: $('#rr'),
    rc: $('#rc'),
    rb: $('#rb'),
    cp: $('#cp'),
    gen: $('#gen'),
    certbox: $('#certbox'),
    cd: $('#cd'),
    cu: $('#cu'),
    box: $('.mbox'),
    calcSelects: $$('#calc select'),
    calcInputs: $$('#calc input')
  };

  const UP = [
    ['+128 GB Storage', 'Instantly increase your phone\'s storage without inserting a memory card.', '₹499', 'Download', 'POPULAR'],
    ['+8 GB RAM', 'Give your phone 8 additional gigabytes of absolutely imaginary RAM.', '₹299', 'Download'],
    ['+50 MP Camera', 'Transform your existing camera sensor into something it definitely isn\'t.', '₹799', 'Upgrade camera'],
    ['+20% Battery', 'Download additional battery capacity. Physics has been temporarily disabled.', '₹399', 'Boost battery'],
    ['Gorilla Glass 8', 'Install a stronger screen protector without touching the screen.', '₹199', 'Install glass'],
    ['Snapdragon Ultra Upgrade', 'Download a faster processor directly into your motherboard.', '₹1,999', 'Download CPU', 'PARODY'],
    ['5G → 7G', 'Future-proof your phone approximately three generations ahead.', '₹999', 'Enable 7G'],
    ['120Hz Display', 'Upgrade your screen refresh rate through the power of software and questionable science.', '₹699', 'Install 120Hz']
  ];

  const emojiSet = ['💾', '🧠', '📷', '🔋', '🛡', '⚙️', '📡', '📱'];

  const renderStore = () => {
    els.grid.innerHTML = UP.map((item, index) => {
      const badge = item[4]
        ? `<span class="tagp ${item[4] === 'PARODY' ? 'parody' : ''}">${item[4]}</span>`
        : '';

      return `
        <article class="glass card">
          ${badge}
          <div class="ico">${emojiSet[index]}</div>
          <h3>${item[0]}</h3>
          <p>${item[1]}</p>
          <div class="price">${item[2]}</div>
          <button class="btn ghost" data-up="${item[0]}">${item[3]}</button>
        </article>
      `;
    }).join('');
  };

  const deviceName = (() => {
    const ua = navigator.userAgent;
    if (/iPhone|iPad/.test(ua)) return 'Generic iOS Device';
    if (/Android/.test(ua)) return 'Generic Android Phone';
    if (/Mobi/.test(ua)) return 'Generic Mobile Device';
    return 'Samsung Galaxy A54 (example)';
  })();

  els.dn.textContent = deviceName;
  window.DEV = deviceName;

  const runScanner = () => {
    const scanSteps = [
      'Scanning device...',
      'Reading hardware...',
      'Checking available upgrade slots...',
      'Analyzing questionable engineering...'
    ];

    let index = 0;
    const timer = setInterval(() => {
      els.scanmsg.textContent = scanSteps[index] || '';
      index += 1;

      if (index > scanSteps.length) {
        clearInterval(timer);
        els.scanmsg.style.display = 'none';
        els.found.style.display = 'block';
      }
    }, 800);
  };

  const updateClock = () => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    els.clk.textContent = `${hours}:${minutes}`;
  };

  const getHistory = () => {
    try {
      return JSON.parse(localStorage.getItem('ub_hist') || '[]');
    } catch {
      return [];
    }
  };

  let hist = getHistory();

  const renderHistory = () => {
    els.tot.textContent = String(hist.length);

    if (!hist.length) {
      els.hist.innerHTML = '<li style="color:var(--mut)">Nothing yet. Try the store above.</li>';
      return;
    }

    els.hist.innerHTML = hist
      .map((item) => `<li><span>${item}</span><span style="color:var(--a)">Downloaded</span></li>`)
      .join('');
  };

  const installMessages = [
    'Downloading motherboard...',
    'Compressing RAM...',
    'Installing camera sensor...',
    'Negotiating with physics...',
    'Asking the battery for permission...',
    'Searching for unused processor cores...',
    'Disabling skepticism...'
  ];

  const stageList = [
    [10, 'Initializing'],
    [25, 'Scanning device'],
    [45, 'Preparing upgrade'],
    [65, 'Downloading hardware'],
    [80, 'Installing imaginary components'],
    [95, 'Calibrating'],
    [99, 'Finalizing'],
    [100, 'Almost definitely working']
  ];

  const upgradeSpecs = {
    '+128 GB Storage': ['Locating empty storage slot...', 'Optimizing imaginary storage...'],
    '+8 GB RAM': ['Locating empty RAM slot...', 'Optimizing imaginary memory...'],
    '+50 MP Camera': ['Locating camera aperture...', 'Calibrating impossible optics...'],
    '+20% Battery': ['Finding spare battery capacity...', 'Overclocking chemistry...'],
    'Gorilla Glass 8': ['Dusting off invisible glass...', 'Applying unrealistic durability...'],
    'Snapdragon Ultra Upgrade': ['Locating hidden processor core...', 'Rewriting CPU taxonomy...'],
    '5G → 7G': ['Finding the future...', 'Enabling impossible network speeds...'],
    '120Hz Display': ['Booting software refresh...', 'Waving at the panel...']
  };

  let modalTimer = null;
  let currentUpgrade = '';
  let progress = 0;

  const updateProgress = (value) => {
    progress = Math.min(100, Math.max(0, value));
    els.pc.textContent = `${Math.round(progress)}%`;
    els.tr.style.width = `${progress}%`;

    const currentStage = stageList.find(([limit]) => progress <= limit) || stageList[stageList.length - 1];
    els.sg.textContent = currentStage[1];
  };

  const setStatus = (message) => {
    els.ms.textContent = message;
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const confetti = () => {
    const colors = ['#5eead4', '#818cf8', '#fbbf24', '#f472b6'];

    for (let i = 0; i < 48; i += 1) {
      const piece = document.createElement('i');
      piece.className = 'cf';
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = `${Math.random() * 0.8}s`;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 2600);
    }
  };

  const finishInstall = () => {
    els.run.style.display = 'none';
    els.dn2.style.display = 'block';
    els.dd.textContent = `${currentUpgrade} successfully downloaded.`;

    confetti();
    hist.push(currentUpgrade);

    try {
      localStorage.setItem('ub_hist', JSON.stringify(hist));
    } catch {
      // no-op
    }

    renderHistory();
  };

  async function runInstallSequence() {
    const runId = modalTimer = Symbol('install-run');
    const details = upgradeSpecs[currentUpgrade] || ['Locating empty upgrade slot...', 'Optimizing imaginary components...'];

    setStatus('Preparing hardware package...');
    await wait(800);
    if (modalTimer !== runId) return;

    setStatus('Scanning motherboard...');
    await wait(800);
    if (modalTimer !== runId) return;

    setStatus(details[0]);
    await wait(800);
    if (modalTimer !== runId) return;

    const checkpoints = [13, 27, 46, 73, 99];
    let cpIndex = 0;

    while (progress < 99 && modalTimer === runId) {
      const target = checkpoints[cpIndex] ?? 99;

      while (progress < target && modalTimer === runId) {
        updateProgress(Math.min(target, progress + 1 + Math.random() * 3));

        if (Math.random() < 0.4) {
          const message = installMessages[Math.floor(Math.random() * installMessages.length)];
          setStatus(message);
        }

        await wait(140 + Math.random() * 120);
      }

      if (modalTimer !== runId) return;

      if (target === 73) {
        setStatus(details[1]);
        await wait(1600);
      } else if (target === 99) {
        setStatus('Applying final hardware changes...');
      } else if (Math.random() < 0.6) {
        await wait(900 + Math.random() * 900);
      }

      cpIndex += 1;
    }

    if (modalTimer !== runId) return;

    await wait(3500);
    if (modalTimer !== runId) return;

    els.wb.style.display = 'block';
    els.box.animate(
      [
        { transform: 'translateX(-8px)' },
        { transform: 'translateX(8px)' },
        { transform: 'translateX(0)' }
      ],
      { duration: 280, iterations: 3 }
    );

    await new Promise((resolve) => {
      els.go.onclick = resolve;
    });

    if (modalTimer !== runId) return;

    els.wb.style.display = 'none';

    while (progress < 100 && modalTimer === runId) {
      updateProgress(Math.min(100, progress + 0.4));

      if (progress > 99.2) {
        setStatus('Almost definitely working');
      }

      await wait(90);
    }

    if (modalTimer !== runId) return;

    updateProgress(100);
    await wait(500);
    finishInstall();
  }

  const openModal = (name) => {
    currentUpgrade = name;
    progress = 0;

    els.modal.classList.add('on');
    els.run.style.display = 'block';
    els.dn2.style.display = 'none';
    els.wb.style.display = 'none';
    els.mt.textContent = `INSTALLING ${name.toUpperCase()}`;

    updateProgress(0);
    runInstallSequence();
  };

  const closeModal = () => {
    modalTimer = null;
    els.modal.classList.remove('on');
    els.go.onclick = null;
  };

  const handleCalculator = () => {
    const storageValue = Number($('#cs').value);
    const ramValue = Number($('#cr').value);
    const cameraValue = Number($('#cc').value);
    const batteryValue = Number($('#cb').value);

    els.cbv.textContent = String(batteryValue);
    els.rs.textContent = `${storageValue + ($('#u1').checked ? 128 : 0)} GB*`;
    els.rr.textContent = `${ramValue + ($('#u2').checked ? 8 : 0)} GB*`;
    els.rc.textContent = `${cameraValue + ($('#u3').checked ? 50 : 0)} MP*`;
    els.rb.textContent = `${Math.round(batteryValue * ($('#u4').checked ? 1.2 : 1))} mAh*`;
  };

  const bindEvents = () => {
    els.again.onclick = () => {
      closeModal();
      location.hash = '#store';
    };

    els.modal.addEventListener('click', (event) => {
      if (event.target.id === 'modal') closeModal();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeModal();
    });

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-up]');
      if (!trigger) return;
      openModal(trigger.dataset.up);
    });

    [...els.calcSelects, ...els.calcInputs].forEach((input) => {
      input.addEventListener('input', handleCalculator);
    });

    document.addEventListener('pointermove', (event) => {
      const card = event.target.closest('.card');
      if (!card) return;

      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });

    els.gen.onclick = () => {
      els.cd.textContent = `Device: ${window.DEV}`;
      els.cu.textContent = hist.length
        ? `Upgrades: ${[...new Set(hist)].join(', ')}`
        : 'Upgrades: none yet (try the store), which is also fine';
      els.certbox.style.display = 'block';
    };

    els.cp.onclick = async () => {
      const shareText = `I just "downloaded" ${hist.length} hardware upgrades on UpgradeBro. Physical hardware changed: 0. (Parody site)`;

      try {
        await navigator.clipboard.writeText(shareText);
        els.cp.textContent = 'Copied';
      } catch {
        els.cp.textContent = 'Copy failed';
      }
    };
  };

  const startTickRotation = () => {
    const tickValues = ['Storage +128 GB*', 'RAM +8 GB*', 'Camera +50 MP*', 'Battery +20%*', 'Physics: negotiating...'];
    let index = 0;

    setInterval(() => {
      index = (index + 1) % tickValues.length;
      els.tick.textContent = tickValues[index];
    }, 1800);
  };

  renderStore();
  runScanner();
  updateClock();
  setInterval(updateClock, 10000);
  renderHistory();
  bindEvents();
  handleCalculator();
  startTickRotation();
})();