// sunInfoCalculator.js
const moment = require('moment-timezone');
const TimeCalculator = require('./statistic');

class SunInfoCalculator {
  static calculateSunInfo(type, eventData) {
    const saoPauloTimeZone = 'America/Sao_Paulo';
    const requestDateTime = moment().tz(saoPauloTimeZone).format('DD/MM/YYYY, HH:mm:ss');
    const eventDateTime = moment(eventData[type]).tz(saoPauloTimeZone); // Ajuste aqui
    let remainingTime = '00:00:00';


    if (!eventDateTime.isBefore(moment())) {
      const remainingTimeDiff = eventDateTime.diff(moment());
      remainingTime = TimeCalculator.calculateRemainingTime(remainingTimeDiff);
    }

    remainingTime = remainingTime.split(':').map(part => part.padStart(2, '0')).join(':');

    return {
      remainingTime,
      exactDateTime: eventDateTime.format('DD/MM/YYYY, HH:mm:ss'),
      requestDateTime,
    };
  }
}

module.exports = { SunInfoCalculator };
