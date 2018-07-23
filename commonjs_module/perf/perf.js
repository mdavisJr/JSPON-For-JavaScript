const Benchmark = require('benchmark');
global.JSPON = require('../jspon.js');
global.mock = require('../tests/mock.js');
global.CircularJSON = require('circular-json');
const fs = require('fs');
eval(fs.readFileSync('perf/cycle.js')+'');

var oneMockObjectsSuite = new Benchmark.Suite;

console.log('1 mock object');
oneMockObjectsSuite
    .add('jspon (Id Referencing)', () => {
        var str = JSPON.stringify(mock.getMockObj());
        var v = JSPON.parse(str);
    }, { setup: () => { JSPON.setSettings({ idFieldName: "$jsponId$" }); } })
    .add('jspon (JsonPath Referencing)', () => {
        var str = JSPON.stringify(mock.getMockObj());
        var v = JSPON.parse(str);
    }, { setup: () => { JSPON.setSettings(); } })
    .add('Douglas Crockford\'s cycle#js  (JsonPath Referencing)', () => {
    	var str = JSON.stringify(JSON.decycle(mock.getMockObj()));
    	var v = JSON.retrocycle(JSON.parse(str));
    })
    .add('npm circular-json', () => {
    	var str = CircularJSON.stringify(mock.getMockObj());
    	var v = CircularJSON.parse(str);
    })
    .on('error', (event) => console.log(event))
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', () => console.log('Fastest is ' + oneMockObjectsSuite.filter('fastest').map('name')))
    .run({ 'async': false });


console.log();
console.log();

console.log('20 mock object');
var multipleMockObjectsSuite = new Benchmark.Suite;

multipleMockObjectsSuite
    .add('jspon (Id Referencing)', () => {
        var str = JSPON.stringify(mock.getArrayMockObj());
        var v = JSPON.parse(str);
    }, { setup: () => { JSPON.setSettings({ idFieldName: "$jsponId$" }); } })
    .add('jspon (JsonPath Referencing)', () => {
        var str = JSPON.stringify(mock.getArrayMockObj());
        var v = JSPON.parse(str);
    }, { setup: () => { JSPON.setSettings(); } })
    .add('Douglas Crockford\'s cycle#js (JsonPath Referencing)', () => {
        var str = JSON.stringify(JSON.decycle(mock.getArrayMockObj()));
        var v = JSON.retrocycle(JSON.parse(str));
    })
    .add('npm circular-json', () => {
    	var str = CircularJSON.stringify(mock.getArrayMockObj());
    	var v = CircularJSON.parse(str);
    })
    .on('error', (event) => console.log(event))
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', () => console.log('Fastest is ' + multipleMockObjectsSuite.filter('fastest').map('name')))
    .run({ 'async': false });