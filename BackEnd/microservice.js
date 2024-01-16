// microservese.js
const express = require('express');
const cors = require('cors');
const { SunriseSunsetService } = require('./services/sunriseSunsetService');
const { SunInfoCalculator } = require('./services/sunInfoCalculator'); // Ajuste aqui

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/getSunInfo', async (req, res) => {
  try {
    const { type, latitude, longitude } = req.body;

    if (isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))) {
      return res.status(400).json({ error: 'Latitude e longitude devem ser números válidos.' });
    }

    if (Math.abs(parseFloat(latitude)) > 90 || Math.abs(parseFloat(longitude)) > 180) {
      return res.status(400).json({ error: 'Latitude deve estar entre -90 e 90, e longitude deve estar entre -180 e 180.' });
    }

    const sunriseSunsetService = new SunriseSunsetService();
    
    const eventData = await sunriseSunsetService.getSunriseSunsetData(latitude, longitude);
    const sunInfo = SunInfoCalculator.calculateSunInfo(type === 'sunrise' ? 'sunrise' : 'sunset', eventData);

    res.json(sunInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Microsserviço rodando na porta ${PORT}`);
});
