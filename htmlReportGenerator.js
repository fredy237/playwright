const reporter = require('cucumber-html-reporter');
var date = new Date();
var currentDate = date.getDate() + '_' + (date.getMonth()+1) + '_' +date.getFullYear()+ '_' +date.getHours()+ '_' +date.getMinutes()+ '_' +date.getSeconds();

var options={
    brandTitle:"demp test scenarios",
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber_report.json',
    output: 'Reports/cucumber_report_'+currentDate+'.html',
    screenshotsDirectory: './Screenshots', 
    storeScreenshots: true,
    reportSuiteAsScenarios:true,
    launchReport:true,
    metadate:{
        "App Version":"1.1.1",
        "Test Environment":"QA",
        "Platform":"Web/Angular",
        "Sprint":"001"
    }
};
reporter.generate(options)