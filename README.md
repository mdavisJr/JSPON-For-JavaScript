If you have seen the following error  <b>"TypeError: Converting circular structure to JSON"</b> or something similar, you are in the right place.  JSON by default can't process circular structures in objects. This code puts a wrapper around your JSON framework of choice and helps the JSON framework process cyclic objects.  It will work with non-cyclic objects also.  This code does not interfere with the JSON parser or stringifier; it does it's work outside those actions.  It will use the standard JSON.parse and JSON.stringify by default unless you set it to use a different JSON framework.
<br />
<br />
This code offers a lot of flexibility while maintaining excellent speed (see Performance Results below).  It supports id referencing and JSONPath referencing.  It can produce a smaller JSON string than regular JSON.  This code will work with all the JSON.net preserve reference options.  It has been tested and will work in the following Firefox, >= IE8, Chrome, and Nodejs.
<br />
<h3>Performance Results (using Benchmark.js)</h3>
<table>
    <tr>
        <th rowspan="2">Chrome 46</th>
        <td><sub>1 Mock Object</sub></td>
        <td>
            <sub>
                jspon#js (Id Referencing) x 14,090 ops/sec ±0.64% (96 runs sampled)<br />
                jspon#js (JsonPath Referencing) x 15,764 ops/sec ±0.43% (99 runs sampled)<br />
                Douglas Crockford's cycle#js (JsonPath Referencing) x 15,913 ops/sec ±0.49% (99 runs sampled)<br />
                dojo#js (JsonPath Referencing) x 2,744 ops/sec ±1.68% (98 runs sampled)<br />
            </sub>
            <b>Fastest: Douglas Crockford's cycle.js</b>
        </td>        
    </tr>
    <tr>
        <td><sub>20 Mock Objects</sub></td>
        <td>
            <sub>
                jspon#js (Id Referencing) x 792 ops/sec ±0.47% (97 runs sampled)<br />
                jspon#js (JsonPath Referencing) x 889 ops/sec ±0.79% (97 runs sampled)<br />
                Douglas Crockford's cycle#js (JsonPath Referencing) x 624 ops/sec ±0.84% (96 runs sampled)<br />
                dojo#js (JsonPath Referencing) x 155 ops/sec ±0.75% (81 runs sampled)<br />
            </sub>
            <b>Fastest: jspon.js</b>
        </td>
    </tr>
    <tr>
        <th rowspan="2">IE 11</th>
        <td><sub>1 Mock Objects</sub></td>
        <td>
            <sub>
                jspon#js (Id Referencing) x 9,730 ops/sec ±1.34% (94 runs sampled)<br />
                jspon#js (JsonPath Referencing) x 10,842 ops/sec ±2.14% (90 runs sampled)<br />
                Douglas Crockford's cycle#js (JsonPath Referencing) x 6,740 ops/sec ±1.74% (90 runs sampled)<br />
                dojo#js (JsonPath Referencing) x 2,272 ops/sec ±2.45% (90 runs sampled)<br />
            </sub>
            <b>Fastest: jspon.js</b>
        </td>
    </tr>
    <tr>
        <td><sub>20 Mock Objects</sub></td>
        <td>
            <sub>
                jspon#js (Id Referencing) x 504 ops/sec ±1.94% (89 runs sampled)<br />
                jspon#js (JsonPath Referencing) x 571 ops/sec ±2.33% (87 runs sampled)<br />
                Douglas Crockford's cycle#js (JsonPath Referencing) x 213 ops/sec ±2.42% (85 runs sampled)<br />
                dojo#js (JsonPath Referencing) x 131 ops/sec ±2.47% (76 runs sampled)<br />
            </sub>
            <b>Fastest: jspon.js</b>
        </td>
    </tr>
    <tr>
        <th rowspan="2">IE 8</th>
        <td><sub>1 Mock Object</sub></td>
        <td>
            <sub>
                jspon#js (Id Referencing) x 4,710 ops/sec ±7.15% (58 runs sampled)<br />
                jspon#js (JsonPath Referencing) x 5,221 ops/sec ±1.57% (65 runs sampled)<br />
                Douglas Crockford's cycle#js (JsonPath Referencing) x 3,482 ops/sec ±1.72% (22 runs sampled)<br />
                dojo#js (JsonPath Referencing) x 1,579 ops/sec ±2.71% (62 runs sampled)<br />
            </sub>
            <b>Fastest: jspon.js</b>
        </td>
    </tr>
    <tr>
        <td><sub>20 Mock Objects</sub></td>
        <td>
            <sub>
                jspon#js (Id Referencing) x 288 ops/sec ±2.38% (59 runs sampled)<br />
                jspon#js (JsonPath Referencing) x 257 ops/sec ±2.82% (59 runs sampled)<br />
                Douglas Crockford's cycle#js (JsonPath Referencing) x 129 ops/sec ±1.98% (58 runs sampled)<br />
                dojo#js (JsonPath Referencing) x 94.27 ops/sec ±3.13% (56 runs sampled)<br />
            </sub>
            <b>Fastest: jspon.js</b>
        </td>
    </tr>
    <tr>
        <th rowspan="2">Firefox 42</th>
        <td><sub>1 Mock Object</sub></td>
        <td>
            <sub>
                jspon#js (Id Referencing) x 6,956 ops/sec ±2.09% (92 runs sampled)<br />
                jspon#js (JsonPath Referencing) x 9,258 ops/sec ±1.52% (96 runs sampled)<br />
                Douglas Crockford's cycle#js (JsonPath Referencing) x 6,830 ops/sec ±1.53% (92 runs sampled)<br />
                dojo#js (JsonPath Referencing) x 1,939 ops/sec ±2.95% (82 runs sampled)<br />
            </sub>
            <b>Fastest: jspon.js</b>
        </td>
    </tr>
    <tr>
        <td><sub>20 Mock Objects</sub></td>
        <td>
            <sub>
                jspon#js (Id Referencing) x 391 ops/sec ±2.59% (87 runs sampled)<br />
                jspon#js (JsonPath Referencing) x 528 ops/sec ±1.91% (91 runs sampled)<br />
                Douglas Crockford's cycle#js (JsonPath Referencing) x 251 ops/sec ±0.99% (92 runs sampled)<br />
                dojo#js (JsonPath Referencing) x 103 ops/sec ±1.91% (76 runs sampled)<br />
            </sub>
            <b>Fastest: jspon.js</b>
        </td>
    </tr>
</table>

<h3>Setting the JSPON Settings</h3>
Only call the setSettings method if you need settings different than the defaults below.<br />

<b>JSPON.setSettings(object);</b> Available settings below.
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

<h3>Convert JSON string to object:</h3>

var obj = JSPON.parse(strJSON);

<h3>Convert object to JSON string:</h3>

var strJson = JSPON.stringify(obj);
<br />
<br />
<h3>Parse JSON string from JSON.net with preserve reference option turned on:</h3>

JSPON.setSettings({idFieldName:'$id'}); //somewhere at the top of the page only needs to be set once.<br />
...
<br />
...
<br />
...
<br />
var obj = JSPON.parse(jsonNetPreserveReferenceJSONStr);
