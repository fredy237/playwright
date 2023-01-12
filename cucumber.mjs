/* const getWorldParams = () => {
    const params = {
      foo: 'bar',
    };
    return params;
  }; */
  const config = {
    requireModule: ['ts-node/register'],
    require: ['features/**/*.ts'],
    format: [
      // 'message:e2e/reports/cucumber-report.ndjson',
      'json:reports/cucumber-report.json',
      'html:reports/report.html',
      'summary',
      'progress-bar',
      
    ],
    
    formatOptions: { snippetInterface: 'async-await' },
    // worldParameters: getWorldParams(),
    publishQuiet: true,
  };

  config.format.push('./reporter.ts');
  export default config