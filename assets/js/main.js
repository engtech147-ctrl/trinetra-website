// TRINETRA Interactive Logic & Behaviors - Team EntangleX
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScrollAndLinks();
  initMobileMenu();
  initRiskEngineSimulator();
  initAlertCardToggle();
  initCaseStudyModal();
});



// 2. Navbar Scrollspy & Smooth Click Scrolling
function initNavbarScrollAndLinks() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  // Smooth click scroll + immediate active state
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          e.preventDefault();
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');

          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  const onScroll = () => {
    const scrollY = window.pageYOffset;

    // Header elevation shadow
    if (scrollY > 15) {
      navbar.classList.add('shadow-md');
    } else {
      navbar.classList.remove('shadow-md');
    }

    // Scrollspy detection
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// 3. Mobile Hamburger Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const isExpanded = !mobileMenu.classList.contains('hidden');
    menuBtn.setAttribute('aria-expanded', isExpanded);
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// 4. Interactive Hero Risk Engine Simulator (Low | Moderate | High | Critical)
function initRiskEngineSimulator() {
  const scenarios = {
    low: {
      precip: '4 mm/hr',
      riverStage: 'Baseline (0.0 m)',
      soilMoist: '28%',
      slope: '120 m/km',
      score: 12,
      scoreColor: '#10B981',
      status: 'LOW RISK • BASELINE',
      statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-300',
      badgeClass: '',
      leadTime: '> 6 Hours',
      confidence: '98.5%',
      action: 'Normal Continuous Telemetry Scanning'
    },
    moderate: {
      precip: '32 mm/hr',
      riverStage: '+0.65 m',
      soilMoist: '65%',
      slope: '240 m/km',
      score: 48,
      scoreColor: '#F59E0B',
      status: 'MODERATE WATCH',
      statusClass: 'bg-amber-50 text-amber-700 border-amber-300',
      badgeClass: '',
      leadTime: '110 Minutes',
      confidence: '93.2%',
      action: 'Alert Drainage Crews & Monitor Sluice Gates'
    },
    high: {
      precip: '54 mm/hr',
      riverStage: '+1.35 m',
      soilMoist: '84%',
      slope: '310 m/km',
      score: 74,
      scoreColor: '#EA580C',
      status: 'HIGH SURGE WARNING',
      statusClass: 'bg-orange-50 text-orange-700 border-orange-300',
      badgeClass: '',
      leadTime: '65 Minutes',
      confidence: '94.0%',
      action: 'Pre-Alert NDRF Units & Stage Evacuation Buses'
    },
    critical: {
      precip: '82 mm/hr',
      riverStage: '+2.25 m',
      soilMoist: '96%',
      slope: '350 m/km',
      score: 94,
      scoreColor: '#EF4444',
      status: 'CRITICAL FLASH SURGE',
      statusClass: 'bg-red-50 text-red-700 border-red-300',
      badgeClass: 'pulse-red',
      leadTime: '35 Minutes',
      confidence: '96.8%',
      action: 'Trigger Ward Siren #4 & Evacuate Riverbank'
    }
  };

  const btnLow = document.getElementById('sim-low');
  const btnModerate = document.getElementById('sim-moderate');
  const btnHigh = document.getElementById('sim-high');
  const btnCritical = document.getElementById('sim-critical');

  const elPrecip = document.getElementById('sim-val-precip');
  const elRiver = document.getElementById('sim-val-river');
  const elSoil = document.getElementById('sim-val-soil');
  const elSlope = document.getElementById('sim-val-slope');
  const elScore = document.getElementById('sim-val-score');
  const elScoreBar = document.getElementById('sim-score-bar');
  const elStatus = document.getElementById('sim-status-badge');
  const elLead = document.getElementById('sim-val-lead');
  const elConf = document.getElementById('sim-val-conf');
  const elAction = document.getElementById('sim-val-action');

  if (!btnCritical) return;

  const buttons = [
    { key: 'low', el: btnLow },
    { key: 'moderate', el: btnModerate },
    { key: 'high', el: btnHigh },
    { key: 'critical', el: btnCritical }
  ];

  const updateSim = (key, activeBtn) => {
    const data = scenarios[key];
    if (!data) return;

    // Reset button states
    buttons.forEach(item => {
      if (item.el) {
        item.el.classList.remove('bg-navy-dark', 'text-white', 'border-blue-500', 'font-bold');
        item.el.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      }
    });

    if (activeBtn) {
      activeBtn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
      activeBtn.classList.add('bg-navy-dark', 'text-white', 'border-blue-500', 'font-bold');
    }

    // Update values
    if (elPrecip) elPrecip.textContent = data.precip;
    if (elRiver) elRiver.textContent = data.riverStage;
    if (elSoil) elSoil.textContent = data.soilMoist;
    if (elSlope) elSlope.textContent = data.slope;
    if (elScore) elScore.textContent = data.score + '%';
    if (elScoreBar) {
      elScoreBar.style.width = data.score + '%';
      elScoreBar.style.backgroundColor = data.scoreColor;
    }
    if (elStatus) {
      elStatus.textContent = data.status;
      elStatus.className = `px-3 py-1 rounded-full text-xs font-bold tracking-wide border transition-all ${data.statusClass} ${data.badgeClass}`;
    }
    if (elLead) elLead.textContent = data.leadTime;
    if (elConf) elConf.textContent = data.confidence;
    if (elAction) elAction.textContent = data.action;
  };

  if (btnLow) btnLow.addEventListener('click', () => updateSim('low', btnLow));
  if (btnModerate) btnModerate.addEventListener('click', () => updateSim('moderate', btnModerate));
  if (btnHigh) btnHigh.addEventListener('click', () => updateSim('high', btnHigh));
  if (btnCritical) btnCritical.addEventListener('click', () => updateSim('critical', btnCritical));

  // Trigger initial animation on load
  setTimeout(() => {
    if (btnCritical) updateSim('critical', btnCritical);
  }, 300);
}

// 5. Alert Card Toggle in "How It Works" Section
function initAlertCardToggle() {
  const tabRed = document.getElementById('tab-alert-red');
  const tabOrange = document.getElementById('tab-alert-orange');
  const alertCard = document.getElementById('example-alert-card');

  if (!tabRed || !tabOrange || !alertCard) return;

  const redData = {
    badge: 'PRIORITY 1 • RED ALERT',
    badgeClass: 'bg-red-600 text-white pulse-red',
    ward: 'Ward 14 — Alaknanda Confluence Corridor',
    leadTime: '42 Minutes to Peak Inundation',
    prob: '94% Probability',
    precip: '76 mm/hr (Past 35 min cloudburst)',
    river: '+2.10 m above critical danger level',
    soil: '95% (Fully saturated micro-basin)',
    action: 'IMMEDIATE EVACUATION: Direct residents of low-lying wards to designated shelter Zone B. Sound ward sirens #3 and #4 immediately.',
    channels: 'Automated SMS (4,210 sent) • Local Siren Active • NDRF Control Room Dispatched'
  };

  const orangeData = {
    badge: 'PRIORITY 2 • ORANGE ADVISORY',
    badgeClass: 'bg-amber-500 text-white',
    ward: 'Ward 08 — Upper Catchment Ridge',
    leadTime: '90 Minutes Potential Inflow',
    prob: '68% Probability',
    precip: '36 mm/hr (Sustained monsoon rain)',
    river: '+0.75 m below spill crest',
    soil: '72% (High antecedent moisture)',
    action: 'STANDBY & PRE-DEPLOYMENT: Clear storm drainage gates, restrict riverfront walking tracks, and stage rapid response team at Sector 4.',
    channels: 'WhatsApp Community Broadcast • DDMA Portal Alert • Emergency Officers Standby'
  };

  const renderAlert = (data) => {
    const badgeEl = alertCard.querySelector('.alert-badge');
    const wardEl = alertCard.querySelector('.alert-ward');
    const leadEl = alertCard.querySelector('.alert-lead');
    const probEl = alertCard.querySelector('.alert-prob');
    const precipEl = alertCard.querySelector('.alert-precip');
    const riverEl = alertCard.querySelector('.alert-river');
    const soilEl = alertCard.querySelector('.alert-soil');
    const actionEl = alertCard.querySelector('.alert-action');
    const channelsEl = alertCard.querySelector('.alert-channels');

    if (badgeEl) {
      badgeEl.textContent = data.badge;
      badgeEl.className = `alert-badge inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${data.badgeClass}`;
    }
    if (wardEl) wardEl.textContent = data.ward;
    if (leadEl) leadEl.textContent = data.leadTime;
    if (probEl) probEl.textContent = data.prob;
    if (precipEl) precipEl.textContent = data.precip;
    if (riverEl) riverEl.textContent = data.river;
    if (soilEl) soilEl.textContent = data.soil;
    if (actionEl) actionEl.textContent = data.action;
    if (channelsEl) channelsEl.textContent = data.channels;
  };

  tabRed.addEventListener('click', () => {
    tabRed.classList.add('bg-red-600', 'text-white');
    tabRed.classList.remove('bg-slate-100', 'text-slate-600');
    tabOrange.classList.remove('bg-amber-500', 'text-white');
    tabOrange.classList.add('bg-slate-100', 'text-slate-600');
    renderAlert(redData);
  });

  tabOrange.addEventListener('click', () => {
    tabOrange.classList.add('bg-amber-500', 'text-white');
    tabOrange.classList.remove('bg-slate-100', 'text-slate-600');
    tabRed.classList.remove('bg-red-600', 'text-white');
    tabRed.classList.add('bg-slate-100', 'text-slate-600');
    renderAlert(orangeData);
  });
}

// 6. Case Study Modal Lightbox
function initCaseStudyModal() {
  const trigger = document.getElementById('case-study-zoom-btn');
  const modal = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('case-study-close-btn');

  if (!trigger || !modal || !closeBtn) return;

  trigger.addEventListener('click', () => {
    modal.classList.remove('hidden-modal');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    modal.classList.add('hidden-modal');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden-modal')) {
      closeModal();
    }
  });
}
