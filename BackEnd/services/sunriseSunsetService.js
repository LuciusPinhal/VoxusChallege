const axios = require('axios');

class SunriseSunsetService {
  async getSunriseSunsetData(latitude, longitude) {
    const response = await axios.get(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`);
    return response.data.results;
  }
}

module.exports = { SunriseSunsetService };