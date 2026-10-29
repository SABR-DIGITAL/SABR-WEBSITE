import express from 'express';
import { createServer as createViteServer } from 'vite';
import { scoreWebsite } from './api/scanner';
import path from 'path';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// API route for Website Scoring
app.post('/api/score', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'A valid website URL is required.' });
    }

    const report = await scoreWebsite(url);
    res.json(report);
  } catch (error: any) {
    console.error('Error during site scoring:', error?.message);
    res.status(400).json({ 
      error: error?.message || 'This website could not be reached or does not exist. Please check the URL and confirm the domain is live and publicly accessible.' 
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`SABR Digital Engine & API active on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
