// config.js - Semua pengaturan foto, link, dan konfigurasi website
export const CONFIG = {
  // 🎨 Informasi Utama
  website: {
    name: "KEVIN CP",
    domain: "nelson.com/id/net",
    title: "KEVIN CP | Creative Developer Portfolio",
    description: "Portfolio 3D/4D Full Control - Developer, Designer & Creator"
  },

  // 👤 About Section
  about: {
    name: "KEVIN CP",
    title: "Full Stack Developer & Creative Coder",
    description: "Saya adalah developer yang passionate dalam menciptakan pengalaman digital interaktif dengan teknologi modern. Spesialis dalam JavaScript, PHP, 3D Web, dan infrastruktur hosting.",
    photo: "https://files.catbox.moe/530hdg.jpg",
    location: "Indonesia 🇮🇩",
    available: true
  },

  // 💬 Contact Links (REAL & BERFUNGSI)
  contacts: {
    whatsapp: {
      label: "WhatsApp",
      url: "https://wa.me/6282313746307",
      icon: "💬",
      color: "#25D366"
    },
    instagram: {
      label: "Instagram",
      url: "https://instagram.com/kevin_ozi9",
      icon: "📸",
      color: "#E4405F"
    },
    github: {
      label: "GitHub",
      url: "https://github.com/-",
      icon: "💻",
      color: "#333"
    },
    email: {
      label: "Email",
      url: "kevinelson756@gmail.com",
      icon: "✉️",
      color: "#EA4335"
    },
    linkedin: {
      label: "LinkedIn",
      url: "https://linkedin.com/in/-",
      icon: "🔗",      color: "#0A66C2"
    }
  },

  // 🛠 Skills Configuration (5 per slide)
  skills: [
    // Slide 1: Programming Languages
    { name: "JavaScript", level: 95, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Language" },
    { name: "PHP", level: 90, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", category: "Language" },
    { name: "Python", level: 85, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Language" },
    { name: "HTML5", level: 98, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "Markup" },
    { name: "CSS3", level: 95, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "Style" },
    
    // Slide 2: Frameworks & Tools
    { name: "React.js", level: 92, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Framework" },
    { name: "Node.js", level: 88, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Runtime" },
    { name: "Express", level: 85, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", category: "Framework" },
    { name: "MySQL", level: 87, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Database" },
    { name: "MongoDB", level: 82, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Database" },
    
    // Slide 3: Hosting & Infrastructure
    { name: "cPanel", level: 95, logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/CPANEL_Logo.svg", category: "Hosting" },
    { name: "Vercel", level: 98, logo: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png", category: "Deploy" },
    { name: "Netlify", level: 96, logo: "https://www.netlify.com/v3/img/components/netlify-color-logo.svg", category: "Deploy" },
    { name: "Cloudflare", level: 90, logo: "https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.svg", category: "CDN" },
    { name: "Git", level: 93, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "Version" },
    
    // Slide 4: Design & Others
    { name: "Figma", level: 88, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", category: "Design" },
    { name: "Three.js", level: 85, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", category: "3D" },
    { name: "WebSocket", level: 80, logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Websocket.svg", category: "Protocol" },
    { name: "REST API", level: 94, logo: "https://upload.wikimedia.org/wikipedia/commons/0/00/REST_API_Logo.svg", category: "API" },
    { name: "Docker", level: 78, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "DevOps" }
  ],

  // 🎮 Game/Stats Section
  stats: {
    title: "📊 Website Statistics",
    description: "Real-time analytics untuk portfolio KEVIN CP",
    metrics: [
      { label: "Total Visitors", icon: "👁️", key: "totalVisitors", suffix: "+" },
      { label: "Page Views", icon: "📄", key: "pageViews", suffix: "+" },
      { label: "Active Now", icon: "🟢", key: "activeNow", suffix: "" },
      { label: "Countries", icon: "🌍", key: "countries", suffix: "+" }
    ]
  },

  // ❤️ Support Section
  support: {
    title: "💙 Support Me",    description: "Jika portfolio ini membantu Anda, dukung pengembangan project open source saya!",
    buttons: [
      { label: "Buy Me Coffee", url: "https://buymeacoffee.com/kevincp", icon: "☕", color: "#FFDD00" },
      { label: "GitHub Sponsor", url: "https://github.com/sponsors/kevincp", icon: "⭐", color: "#EA4AAA" },
      { label: "PayPal", url: "https://paypal.me/kevincp", icon: "💰", color: "#009CDE" }
    ]
  },

  // 🎨 Visual Settings
  visual: {
    backgroundColor: "#0a0a0f",
    particleColor: "rgba(255,255,255,0.3)",
    accentColor: "#00d4ff",
    textColor: "#ffffff",
    cardBg: "rgba(20,20,35,0.8)",
    slideCount: 4, // Total slide skills
    skillsPerSlide: 5
  }
};

// Helper function untuk mendapatkan skills per slide
export const getSkillsForSlide = (slideIndex) => {
  const { skills, visual } = CONFIG;
  const start = slideIndex * visual.skillsPerSlide;
  const end = start + visual.skillsPerSlide;
  return skills.slice(start, end);
};

export default CONFIG;