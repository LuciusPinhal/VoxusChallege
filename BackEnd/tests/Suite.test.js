const { SunInfoCalculator } = require('../services/sunInfoCalculator');
const { SunriseSunsetService } = require('../services/sunriseSunsetService');

var sunsetData = {};
var sunriseData = {};
const dateToTest = new Date('2024-01-10T16:00:00Z');
const service = new SunriseSunsetService();

describe('Test Voxus Challenge', () => {
  test('Get Sunrise and Sunset Data', async () => {
    sunriseData = await service.getSunriseSunsetData(37.7749, -122.4194, dateToTest, 'sunrise');
    expect(sunriseData).toHaveProperty('sunrise');

    sunsetData = await service.getSunriseSunsetData(37.7749, -122.4194, dateToTest, 'sunset');
    expect(sunsetData).toHaveProperty('sunset');

  });

  test('Get Sunrise Data with Invalid Coordinates', async () => {
    const service = new SunriseSunsetService();

    try {
      await service.getSunriseSunsetData(999, 999, dateToTest, 'sunrise');
      expect(true).toBe(false);
    } catch (error) {
      expect(error.response).toBeUndefined();
    }
  });

  test('Get Sunset Data with Invalid Coordinates', async () => {
    try {
      await service.getSunriseSunsetData(999, 999, dateToTest, 'sunset');
      expect(true).toBe(false);
    } catch (error) {
      expect(error.response).toBeUndefined();
    }
  });


  test('Calculate SunInfo based on SunriseSunsetService data', async () => {
    const sunInfo = SunInfoCalculator.calculateSunInfo('sunrise', sunriseData);

    expect(sunInfo).toHaveProperty('remainingTime');
    expect(sunInfo).toHaveProperty('exactDateTime');
    expect(sunInfo).toHaveProperty('requestDateTime');

    expect(sunInfo.remainingTime).toBe("00:00:00");
    expect(sunInfo.exactDateTime).toBe("16/01/2024, 12:22:01");
  
  });

  test('Calculate SunInfo for Sunset based on SunriseSunsetService data', async () => {

    const sunInfo = SunInfoCalculator.calculateSunInfo('sunset', sunsetData);

    expect(sunInfo).toHaveProperty('remainingTime');
    expect(sunInfo).toHaveProperty('exactDateTime');
    expect(sunInfo).toHaveProperty('requestDateTime');

    expect(sunInfo.exactDateTime).toBe("16/01/2024, 22:16:43");

  });
});