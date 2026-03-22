// main.js - Main JavaScript for KEVIN CP Portfolio
import { CONFIG, getSkillsForSlide } from './config.js';

// ===== GLOBAL STATE =====
let currentSlide = 0;
let statsData = null;
let particles = [];

// ===== DOM ELEMENTS =====
const DOM = {
  loading: document.getElementById('loading'),
  scrollIndicator: document.getElementById('scrollIndicator'),
  aboutPhoto: document.getElementById('aboutPhoto'),
  aboutName: document.getElementById('aboutName'),
  aboutTitle: document.getElementById('aboutTitle'),
  aboutDesc: document.getElementById('aboutDesc'),
  aboutBadge: document.getElementById('aboutBadge'),
  availabilityText: document.getElementById('availabilityText'),
  skillsContainer: document.getElementById('skillsContainer'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  pageIndicator: document.getElementById('pageIndicator'),
  totalPages: document.getElementById('totalPages'),
  statsGrid: document.getElementById('statsGrid'),
  contactGrid: document.getElementById('contactGrid'),
  supportTitle: document.getElementById('supportTitle'),
  supportDesc: document.getElementById('supportDesc'),
  supportButtons: document.getElementById('supportButtons'),
  year: document.getElementById('year')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
  initParticles();
  loadConfig();
  setupSkillSlider();
  setupScrollObserver();
  await loadStatistics();
  setupContactLinks();
  setupSupportButtons();
  
  // Hide loading after 800ms
  setTimeout(() => {
    DOM.loading.classList.add('hidden');
    // Trigger first section visibility
    document.querySelector('section')?.classList.add('visible');
  }, 800);
  
  // Update year
  DOM.year.textContent = new Date().getFullYear();  
  // Hide scroll indicator after first scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      DOM.scrollIndicator.style.display = 'none';
    }
  }, { once: true });
});

// ===== PARTICLE BACKGROUND =====
function initParticles() {
  const container = document.getElementById('particles');
  const particleCount = 80;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position & animation
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 2 + 1;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    container.appendChild(particle);
    particles.push(particle);
  }
  
  // Animate particles on mouse move (subtle)
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    particles.forEach((p, i) => {
      const speed = 0.02;
      const rect = p.getBoundingClientRect();
      const px = rect.left + rect.width / 2;
      const py = rect.top + rect.height / 2;
      
      const dx = (mouseX * window.innerWidth - px) * speed;
      const dy = (mouseY * window.innerHeight - py) * speed;
            p.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  });
}

// ===== LOAD CONFIGURATION =====
function loadConfig() {
  const { about, visual } = CONFIG;
  
  // About Section
  DOM.aboutPhoto.src = about.photo;
  DOM.aboutPhoto.alt = about.name;
  DOM.aboutName.textContent = about.name;
  DOM.aboutTitle.textContent = about.title;
  DOM.aboutDesc.textContent = about.description;
  DOM.availabilityText.textContent = about.available ? 'Available for projects' : 'Currently busy';
  
  // Set CSS variables
  document.documentElement.style.setProperty('--accent-color', visual.accentColor);
  document.documentElement.style.setProperty('--bg-color', visual.backgroundColor);
}

// ===== SKILL SLIDER =====
function setupSkillSlider() {
  const { visual } = CONFIG;
  const totalSlides = Math.ceil(CONFIG.skills.length / visual.skillsPerSlide);
  
  DOM.totalPages.textContent = totalSlides;
  updateSlide();
  
  DOM.prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlide();
    }
  });
  
  DOM.nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlide();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentSlide > 0) {
      currentSlide--;
      updateSlide();
    }    if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlide();
    }
  });
}

function updateSlide() {
  const { visual } = CONFIG;
  const totalSlides = Math.ceil(CONFIG.skills.length / visual.skillsPerSlide);
  const skills = getSkillsForSlide(currentSlide);
  
  // Update page indicator
  DOM.pageIndicator.textContent = `${currentSlide + 1} / ${totalSlides}`;
  
  // Update buttons state
  DOM.prevBtn.disabled = currentSlide === 0;
  DOM.nextBtn.disabled = currentSlide === totalSlides - 1;
  
  // Render skills
  DOM.skillsContainer.innerHTML = `
    <div class="skill-slide active">
      ${skills.map(skill => `
        <div class="skill-card">
          <span class="skill-category">${skill.category}</span>
          <img src="${skill.logo}" alt="${skill.name}" class="skill-logo" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>⚡</text></svg>'">
          <div class="skill-name">${skill.name}</div>
          <div class="skill-bar">
            <div class="skill-progress" style="--level: ${skill.level}%"></div>
          </div>
          <div class="skill-percent">${skill.level}%</div>
        </div>
      `).join('')}
    </div>
  `;
  
  // Trigger animation
  const slide = DOM.skillsContainer.querySelector('.skill-slide');
  slide.style.animation = 'none';
  setTimeout(() => {
    slide.style.animation = 'slideIn 0.5s ease';
  }, 10);
}

// ===== SCROLL OBSERVER (Appear/Disappear Animation) =====
function setupScrollObserver() {
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Load stats when stats section is visible
        if (entry.target.id === 'stats' && !statsData) {
          loadStatistics();
        }
      } else {
        // Optional: remove class when scrolling up (as requested)
        // entry.target.classList.remove('visible');
      }
    });
  }, { 
    threshold: 0.2,
    rootMargin: '-50px 0px -50px 0px'
  });
  
  sections.forEach(section => observer.observe(section));
}

// ===== STATISTICS (Real-time) =====
async function loadStatistics() {
  try {
    // Try to fetch from server first
    const response = await fetch('/api/stats');
    
    if (response.ok) {
      statsData = await response.json();
    } else {
      // Fallback to local data
      const localData = await fetch('data.json').then(r => r.json());
      statsData = localData.statistics;
    }
    
    renderStatistics(statsData);
    
    // Auto-refresh every 30s
    setInterval(async () => {
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          statsData = await res.json();
          renderStatistics(statsData);
        }
      } catch (e) {
        console.log('Stats refresh skipped (offline mode)');
      }
    }, 30000);
    
  } catch (error) {    console.warn('Statistics load failed, using demo data');
    // Demo data fallback
    renderStatistics({
      totalVisitors: 15847,
      pageViews: 42391,
      activeNow: Math.floor(Math.random() * 50) + 10,
      countries: 47
    });
  }
}

function renderStatistics(data) {
  const { metrics } = CONFIG.stats;
  
  DOM.statsGrid.innerHTML = metrics.map(metric => `
    <div class="stat-card">
      <span class="stat-icon">${metric.icon}</span>
      <div class="stat-value">${formatNumber(data[metric.key])}${metric.suffix}</div>
      <div class="stat-label">${metric.label}</div>
    </div>
  `).join('');
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

// ===== CONTACT LINKS =====
function setupContactLinks() {
  const { contacts } = CONFIG;
  
  DOM.contactGrid.innerHTML = Object.entries(contacts).map(([key, contact]) => `
    <a href="${contact.url}" target="_blank" rel="noopener noreferrer" 
       class="contact-btn" style="--color: ${contact.color}">
      <span class="contact-icon">${contact.icon}</span>
      <span class="contact-label">${contact.label}</span>
      <span class="contact-url">${new URL(contact.url).hostname.replace('www.', '')}</span>
    </a>
  `).join('');
}

// ===== SUPPORT BUTTONS =====
function setupSupportButtons() {
  const { support } = CONFIG;
  
  DOM.supportTitle.textContent = support.title;
  DOM.supportDesc.textContent = support.description;
    DOM.supportButtons.innerHTML = support.buttons.map(btn => `
    <a href="${btn.url}" target="_blank" rel="noopener noreferrer" 
       class="support-btn" style="--color: ${btn.color}">
      <span class="support-icon">${btn.icon}</span>
      ${btn.label}
    </a>
  `).join('');
}

// ===== UTILITY: Track Page View (for stats) =====
export async function trackPageView(page = window.location.pathname) {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page, timestamp: new Date().toISOString() })
    });
  } catch (e) {
    // Silent fail for offline/analytics blockers
  }
}

// Track initial page view
trackPageView();

// ===== EXPORT FOR SERVER COMMUNICATION =====
export { statsData };