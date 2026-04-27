const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
// In ECS, containers in same task share localhost
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

app.use(cors());

app.get('/api', async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api`, { timeout: 5000 });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Backend unreachable' });
  }
});

app.get('/', (req, res) => {
  res.send(`
    <html><head><title>🐳 ECS Fargate App</title></head>
    <body>
      <h1>✅ Architecture 3: Docker + ECS</h1>
      <p>Backend Status: <strong id="status">Loading...</strong></p>
      <script>
        fetch('/api')
          .then(r => r.json())
          .then(d => document.getElementById('status').textContent = d.status)
          .catch(() => document.getElementById('status').textContent = '❌ Error');
      </script>
    </body></html>
  `);
});

app.listen(PORT, '0.0.0.0', () => console.log('Frontend running'));
