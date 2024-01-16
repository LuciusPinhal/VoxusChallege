const testData = require('./testData');
const {
  calculateChurnRate,
  calculateChurnAmonth,
  excelDateToJSDate,
  groupsubscriptionsAmonth,
  getStatisticsUsersAmonth,
  calculateARPU,
  calculateARR,
  calculateLTV,
  calculateassinaturas,
  calculateMRR,
} = require('./services/statistic.js');


function convertTestDataDates(testData) {
  return testData.map((line) => {
    if (line['data início']) {
      line['data início'] = excelDateToJSDate(line['data início']);
    }

    if (line['data status']) {
      line['data status'] = excelDateToJSDate(line['data status']);
    }

    if (line['data cancelamento']) {
      line['data cancelamento'] = excelDateToJSDate(line['data cancelamento']);
    }

    if (line['próximo ciclo']) {
      line['próximo ciclo'] = excelDateToJSDate(line['próximo ciclo']);
    }

    return line;
  });
}

let convertedTestData; 

beforeAll(() => {
  convertedTestData = convertTestDataDates(testData);
});

describe('Churn Rate Calculation', () => {
  test('Churn rate should be calculated correctly', () => {
    const result = calculateChurnRate(convertedTestData);
    expect(result).toBeCloseTo(42.86, 2);
  });
});

describe('Active subscriptions verification', () => {
  test('Active subscriptions verification should be calculated correctly', () => {
    const result = calculateassinaturas(convertedTestData);
    expect(result.length).toBe(14);
  });
});

describe('ARR Calculation', () => {
    test('ARR should be calculated correctly', () => {
        const result = calculateARR(convertedTestData);
        expect(result).toBeCloseTo(1435.42, 2);
    });
});

describe('mrr Calculation', () => {
    test('mrr should be calculated correctly', () => {
        const result = calculateMRR(convertedTestData);
        expect(Object.keys(result).length).toBe(5);
    });
});

describe('ChurnRateAmonth Calculation', () => {
    test('ChurnRateAmonth should be calculated correctly', () => {
        const result = calculateChurnAmonth(convertedTestData);
        expect(Object.keys(result).length).toBe(12);
    });
});

describe('statisticsAmonth Calculation', () => {
    test('statisticsAmonth should be calculated correctly', () => {
        const result = getStatisticsUsersAmonth(convertedTestData);
        expect(Object.keys(result).length).toBe(13);
    });
});

describe('resultGroupedPermonth Calculation', () => {
    test('resultGroupedPermonth should be calculated correctly', () => {
        const result = groupsubscriptionsAmonth(convertedTestData);
        expect(Object.keys(result).length).toBe(2);
    });
});

describe('calculateARPU Calculation', () => {
 test('calculateARPU should be calculated correctly', () => {

    const {
        arpuMonthly,
        arpuAnnual,
        totalMonthlyRevenue,
        totalAnnualRevenue,
        totalUsers
     } = calculateARPU(convertedTestData);
     
    expect(arpuMonthly).toBeCloseTo(323.7306547619047, 2);
    expect(arpuAnnual).toBeCloseTo(1435.422142857143, 2);
    expect(totalMonthlyRevenue).toBeCloseTo(4532.229166666666, 2);
    expect(totalAnnualRevenue).toBeCloseTo(20095.91, 2);
    expect(totalUsers).toBe(14);
    });
});

describe('calculateLTV Calculation', () => {
 test('calculateLTV should be calculated correctly', () => {

    const {
        ltvMonthly,
        ltvAnnual
     } = calculateLTV(convertedTestData);
     
    expect(ltvMonthly).toBeCloseTo(7.553211730329088, 2);
    expect(ltvAnnual).toBeCloseTo(33.490950603293115, 2);
    });
});



