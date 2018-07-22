# JSPON - JavaScript Persistent Object Notation

If you have seen the following error **"TypeError: Converting circular structure to JSON"** or similar, you are in the right place. JSON by default can't process circular structures in objects. This code puts a wrapper around your JSON framework of choice and helps the JSON framework process cyclic objects. It will work with non-cyclic objects as well. It will use the standard JSON.parse and JSON.stringify by default unless you set it to use a different JSON framework. 

This code offers a lot of flexibility while maintaining excellent speed (see Performance Results below). It supports id referencing and JSONPath referencing, increasing compatibility with other jspon frameworks in other programming languages including JSON.NET preserve reference options. In most cases, JSPON's output is smaller than regular JSON, helping you push smaller payloads over the network. This code will work in Firefox, >= IE8, Chrome, and Nodejs.

## Performance Results (using Benchmark.js)
<table>
    <tr>
        <th rowspan="2">Node.js</th>
        <td><sub>1 Mock Object</sub></td>
        <td>
            <sub>
                jspon (Id Referencing) x 17,916 ops/sec ±1.49% (87 runs sampled)<br />
                jspon (JsonPath Referencing) x 22,587 ops/sec ±0.57% (96 runs sampled)<br />
                Douglas Crockford's cycle#js  (JsonPath Referencing) x 15,737 ops/sec ±1.75% (86 runs sampled)<br />
                npm circular-json x 9,556 ops/sec ±0.90% (87 runs sampled)<br />
                <b>Fastest is jspon (JsonPath Referencing)</b>
            </sub>
        </td>        
    </tr>
    <tr>
        <td><sub>20 Mock Objects</sub></td>
        <td>
            <sub>
                jspon (Id Referencing) x 1,089 ops/sec ±1.27% (91 runs sampled)<br />
                jspon (JsonPath Referencing) x 1,290 ops/sec ±0.77% (94 runs sampled)<br />
                Douglas Crockford's cycle#js (JsonPath Referencing) x 933 ops/sec ±1.25% (88 runs sampled)<br />
                npm circular-json x 475 ops/sec ±1.16% (85 runs sampled)<br />
                <b>Fastest is jspon (JsonPath Referencing)</b>
            </sub>
        </td>
    </tr>
</table>

## Installation
**Using NPM**

```
npm i --save jspon
```

**Browser**
```
Download browser/jspon.js or es_modules/jspon.js from https://github.com/mdavisJr/JSPON-For-JavaScript or use browserify.
```

## Setting the JSPON Settings
Only call the setSettings method if you need settings different than the defaults below.<br />

**JSPON.setSettings(object); Available settings below.**
<table>
    <tr>
        <th>Field</th>
        <th>Data Type</th>
        <th>Description</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td><b>idFieldName</b></td>
        <td>string</td>
        <td>This option turns on id referencing and allows you to specify the id property name that will be used to track unique objects.  The id property name will only show up in the JSON string and will not show up in the object. If this option is set, jsonPathRoot setting will be ignored.
            <br />
            <b>It can not be a property name that exist in your objects.</b></td>
        <td></td>
    </tr>
    <tr>
        <td><b>preserveArrays</b></td>
        <td>boolean</td>
        <td>Decides whether or not to preserve references to arrays.</td>
        <td>true</td>
    </tr>
    <tr>
        <td><b>jsonPathRoot</b></td>
        <td>string</td>
        <td>Allows you to choose what the JSONPath root is.</td>
        <td>$</td>
    </tr>
    <tr>
        <td><b>jsonPathFormat</b></td>
        <td>string</td>
        <td>Valid values are DotNotation or BracketNotation.<br />
            <br />
            <b>jsonPath Dot-Notation:</b><br />
            $.children[0].name<br />
            <br />
            <b>jsonPath Bracket-Notation:</b><br />
            $['children'][0]['name']<br />
        </td>
        <td>DotNotation</td>
    </tr>
    <tr>
        <td><b>jsonParser</b></td>
        <td>function(str)</td>
        <td>Allows you to set your JSON parser of choice<br />
            <br />
            <b>Examples:</b><br />
            JSPON.setSettings({jsonParser: CustomJSON.parse});
            <br />
            <b>--or--</b><br />
            JSPON.setSettings({jsonParser: function(str) {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return JSON.parse(str, function(){<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br />
            });
        </td>
        <td>JSON.parse</td>
    </tr>
    <tr>
        <td><b>jsonStringifier</b></td>
        <td>function(obj)</td>
        <td>Allows you to set your JSON stringifier of choice<br />
            <br />
            <b>Examples:</b><br />
            JSPON.setSettings({jsonStringifier: CustomJSON.stringify });
            <br />
            <b>--or--</b><br />
            JSPON.setSettings({jsonStringifier: function(obj) {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return JSON.stringify(obj, null, 5);<br />
            });
        </td>
        <td>JSON.stringify</td>
    </tr>
</table>

## Examples (Node.js)

**Default Settings jsonPath reference with preserveArrays = true**
```
const JSPON = require('jspon');

var json = JSPON.stringify(getObjWithCircularRef());

var obj = JSPON.parse(json);

//Value of json variable
//{"name":"parent","children":[{"name":"John","parent":{"$ref":"$"}},{"name":"Jane","parent":{"$ref":"$"}}],"childrenCopy":{"$ref":"$.children"},"child1":{"$ref":"$.children[0]"},"child2":{"$ref":"$.children[1]"}}
```
**jsonPath reference with preserveArrays = false**
```
const JSPON = require('jspon');
JSPON.setSettings({ preserveArrays: false });

var json = JSPON.stringify(getObjWithCircularRef());

var obj = JSPON.parse(json);

//Value of json variable
//{"name":"parent","children":[{"name":"John","parent":{"$ref":"$"}},{"name":"Jane","parent":{"$ref":"$"}}],"childrenCopy":[{"$ref":"$.children[0]"},{"$ref":"$.children[1]"}],"child1":{"$ref":"$.children[0]"},"child2":{"$ref":"$.children[1]"}}
```
**Id reference with preserveArrays = true**
```
const JSPON = require('jspon');
JSPON.setSettings({ idFieldName: '$id' });

var json = JSPON.stringify(getObjWithCircularRef());

var obj = JSPON.parse(json);

//Value of json variable
//{"$id":1,"name":"parent","children":{"$values":[{"$id":3,"name":"John","parent":{"$ref":1}},{"$id":4,"name":"Jane","parent":{"$ref":1}}],"$id":2},"childrenCopy":{"$ref":2},"child1":{"$ref":3},"child2":{"$ref":4}}
```
**Id reference with preserveArrays = false**
```
const JSPON = require('jspon');
JSPON.setSettings({ idFieldName: '$id', preserveArrays: false });

var json = JSPON.stringify(getObjWithCircularRef());

var obj = JSPON.parse(json);

//Value of json variable
//{"$id":1,"name":"parent","children":[{"$id":2,"name":"John","parent":{"$ref":1}},{"$id":3,"name":"Jane","parent":{"$ref":1}}],"childrenCopy":[{"$ref":2},{"$ref":3}],"child1":{"$ref":2},"child2":{"$ref":3}}
```
**jsonPath reference with preserveArrays = true and jsonPathFormat = Bracket-Notation**
```
const JSPON = require('jspon');
JSPON.setSettings({ jsonPathFormat: 'BracketNotation' });

var json = JSPON.stringify(getObjWithCircularRef());

var obj = JSPON.parse(json);

//Value of json variable
//{"name":"parent","children":[{"name":"John","parent":{"$ref":"$"}},{"name":"Jane","parent":{"$ref":"$"}}],"childrenCopy":{"$ref":"$['children']"},"child1":{"$ref":"$['children'][0]"},"child2":{"$ref":"$['children'][1]"}}
```
**jsonPath reference with preserveArrays = false and jsonPathFormat = Bracket-Notation**
```
const JSPON = require('jspon');
JSPON.setSettings({ preserveArrays: false, jsonPathFormat: 'BracketNotation' });

var json = JSPON.stringify(getObjWithCircularRef());

var obj = JSPON.parse(json);

//Value of json variable
//{"name":"parent","children":[{"name":"John","parent":{"$ref":"$"}},{"name":"Jane","parent":{"$ref":"$"}}],"childrenCopy":[{"$ref":"$['children'][0]"},{"$ref":"$['children'][1]"}],"child1":{"$ref":"$['children'][0]"},"child2":{"$ref":"$['children'][1]"}}
```