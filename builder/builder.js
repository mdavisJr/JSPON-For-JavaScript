const fs = require('fs');
const path = require('path');
const util = require('util');

RegExp.escape= function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

fs.readFile('base_jspon.js', 'utf-8', (err, baseFile) => {
    //Build browser file
    let browserTemplate =
`JSPON = (function () {
    'use strict';        
    %s

    return {
        parse: parse,
        stringify: stringify,
        setSettings: setSettings,
        getSettings: getSettings
    };
})();`;
    let strBrowser = util.format(browserTemplate, baseFile.replace(/\r\n/g, "\r\n\t"));
    fs.writeFile('../browser/jspon.js', strBrowser, (err) => { if (err) console.log(err); });

    let commonJSReplacements = {
        'function setSettings': 'exports.setSettings = function ', 
        'function getSettings': 'exports.getSettings = function ', 
        'function stringify': 'exports.stringify = function ', 
        'function parse': 'exports.parse = function '
    };

    let strCommonJSModule = baseFile.substring(0);
    for(var key in commonJSReplacements) {
        strCommonJSModule = strCommonJSModule.replace(key, commonJSReplacements[key]);
    }
    
    fs.writeFile('../commonjs_module/jspon.js', strCommonJSModule, (err) => { if (err) console.log(err); });

    let esModuleReplacements = {
        'function setSettings': 'export function setSettings', 
        'function getSettings': 'export function getSettings', 
        'function stringify': 'export function stringify', 
        'function parse': 'export function parse'
    };

    let strESModule = baseFile.substring(0);
    for(var key in esModuleReplacements) {
        strESModule = strESModule.replace(key, esModuleReplacements[key]);
    }
    
    fs.writeFile('../es_modules/jspon.js', strESModule, (err) => { if (err) console.log(err); });
});

fs.readFile('base_mock.js', 'utf-8', (err, baseFile) => {
    //Build browser file
    fs.writeFile('../browser/tests/mock.js', baseFile, (err) => { if (err) console.log(err); });

    let commonJSReplacements = {
        'function getMockObj': 'exports.getMockObj = function ', 
        'function getArrayMockObj': 'exports.getArrayMockObj = function ',
        'getMockObj()': 'exports.getMockObj()'
    };

    let strCommonJSModule = baseFile.substring(0);
    for(var key in commonJSReplacements) {
        strCommonJSModule = strCommonJSModule.replace(new RegExp(RegExp.escape(key), 'g'), commonJSReplacements[key]);
    }
    
    fs.writeFile('../commonjs_module/tests/mock.js', strCommonJSModule, (err) => { if (err) console.log(err); });

    let esModuleReplacements = {
        'function getMockObj': 'export function getMockObj', 
        'function getArrayMockObj': 'export function getArrayMockObj'
    };

    let strESModule = baseFile.substring(0);
    for(var key in esModuleReplacements) {
        strESModule = strESModule.replace(key, esModuleReplacements[key]);
    }
    
    fs.writeFile('../es_modules/tests/mock.js', strESModule, (err) => { if (err) console.log(err); });
});

fs.readFile('base_spec.js', 'utf-8', (err, baseFile) => {
    //Build browser file
    let strBrowser = baseFile.replace(/console.log/g, "//console.log");
    fs.writeFile('../browser/tests/spec.js', strBrowser, (err) => { if (err) console.log(err); });

    //Build browser file
    let commonJSTemplate =
`const JSPON = require('../jspon.js');
const mock = require('./mock.js');
const _ = require('lodash');        
%s
`;

    let commonJSReplacements = {
        'getMockObj': 'mock.getMockObj', 
        'getArrayMockObj': 'mock.getArrayMockObj'
    };

    let strCommonJSModule = baseFile.substring(0);
    for(var key in commonJSReplacements) {
        strCommonJSModule = strCommonJSModule.replace(new RegExp(RegExp.escape(key), 'g'), commonJSReplacements[key]);
    }
    
    strCommonJSModule = util.format(commonJSTemplate, strCommonJSModule);
    fs.writeFile('../commonjs_module/tests/spec.js', strCommonJSModule, (err) => { if (err) console.log(err); });

    // let esModuleReplacements = {
    //     'function setSettings': 'export function setSettings', 
    //     'function getSettings': 'export function getSettings', 
    //     'function stringify': 'export function stringify', 
    //     'function parse': 'export function parse'
    // };

    // let strESModule = baseFile.substring(0);
    // for(var key in esModuleReplacements) {
    //     strESModule = strESModule.replace(key, esModuleReplacements[key]);
    // }
    
    fs.writeFile('../es_modules/tests/spec.js', baseFile, (err) => { if (err) console.log(err); });
});