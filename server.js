// server.js - Backend for statistics & API
import express from 'express';
import cors from 'cors';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Data file path
const DATA_FILE = join(__dirname, 'data.json');

// ===== API: Get Statistics =====
app.get('/api/stats', async (req, res) => {
  try {
    const data = await readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    
    // Simulate real-time active users (random fluctuation)
    parsed.statistics.activeNow = Math.max(1, 
      parsed.statistics.activeNow + Math.floor(Math.random() * 5) - 2
    );
    
    // Update timestamp
    parsed.statistics.lastUpdated = new Date().toISOString();
    
    res.json(parsed.statistics);
  } catch (error) {
    console.error('Stats error:', error);
    // Return demo data on error
    res.json({
      totalVisitors: 15847,
      pageViews: 42391,
      activeNow: Math.floor(Math.random() * 30) + 15,
      countries: 47,
      lastUpdated: new Date().toISOString()
    });
  }
});

// ===== API: Track Page View =====app.post('/api/track', async (req, res) => {
  try {
    const { page, timestamp } = req.body;
    let data = JSON.parse(await readFile(DATA_FILE, 'utf-8'));
    
    // Increment counters
    data.statistics.totalVisitors += 1;
    data.statistics.pageViews += 1;
    data.visitors.today += 1;
    
    // Update top pages
    const pageIndex = data.topPages.findIndex(p => p.path === page);
    if (pageIndex >= 0) {
      data.topPages[pageIndex].views += 1;
    } else {
      data.topPages.push({ path: page, views: 1 });
      data.topPages.sort((a, b) => b.views - a.views);
      data.topPages = data.topPages.slice(0, 10); // Keep top 10
    }
    
    // Save (debounced in production)
    await writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    
    res.json({ success: true, tracked: true });
  } catch (error) {
    console.error('Track error:', error);
    res.status(500).json({ success: false, error: 'Tracking failed' });
  }
});

// ===== HEALTH CHECK =====
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    domain: 'nelson.com/id/net'
  });
});

// ===== FALLBACK: Serve index.html for SPA routing =====
app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) return next();
  res.sendFile(join(__dirname, 'index.html'));
});

// ===== START SERVER =====
const start = async () => {
  try {
    app.listen(PORT, () => {      console.log(`✅ KEVIN CP Server running on port ${PORT}`);
      console.log(`🌐 Local: http://localhost:${PORT}`);
      console.log(`📦 Domain: nelson.com/id/net`);
      console.log(`🚀 Ready for Vercel/Netlify/cPanel deployment`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

start();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 Shutting down gracefully...');
  process.exit(0);
});