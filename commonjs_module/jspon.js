var idFieldName = 'b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48';
var useIdBase = false;
var preserveArrays = true;
var jsonParser = JSON.parse;
var jsonStringifier = JSON.stringify;
var jsonPathRoot = '$';
var useJSONPathDotNotation = true;

exports.setSettings = function (newSettings) {
    if (!newSettings) {
        newSettings = {};
    }
    if (Object.prototype.hasOwnProperty.call(newSettings, 'preserveArrays')) {
        preserveArrays = newSettings.preserveArrays;
    } else {
        preserveArrays = true;
    }
    if (Object.prototype.hasOwnProperty.call(newSettings, 'jsonPathRoot')) {
        jsonPathRoot = newSettings.jsonPathRoot;
        useIdBase = false;
        idFieldName = undefined;
    } else {
        jsonPathRoot = '$';
        useIdBase = false;
        idFieldName = undefined;
    }
    if (Object.prototype.hasOwnProperty.call(newSettings, 'jsonPathFormat')) {
        if (newSettings['jsonPathFormat'] === 'BracketNotation') {
            useJSONPathDotNotation = false;
        } else {
            useJSONPathDotNotation = true;
        }
    } else {
        useJSONPathDotNotation = true;
    }
    if (Object.prototype.hasOwnProperty.call(newSettings, 'idFieldName')) {
        idFieldName = newSettings.idFieldName;
        useIdBase = true;
        jsonPathRoot = undefined;
    } else {
        idFieldName = 'b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48';
        useIdBase = false;
    }
    if (Object.prototype.hasOwnProperty.call(newSettings, 'jsonParser')) {
        jsonParser = newSettings.parse;
    } else {
        jsonParser = JSON.parse;
    }
    if (Object.prototype.hasOwnProperty.call(newSettings, 'jsonStringifier')) {
        jsonStringifier = newSettings.stringify
    } else {
        jsonStringifier = JSON.stringify;
    }
}
exports.getSettings = function () {
    return {
        'idFieldName': idFieldName,
        'useIdBase': useIdBase,
        'preserveArrays': preserveArrays,
        'jsonParser': jsonParser,
        'jsonStringifier': jsonStringifier,
        'jsonPathRoot': jsonPathRoot,
        'jsonPathFormat': useJSONPathDotNotation ? 'DotNotation' : 'BracketNotation'
    };
}
var isMapSupported = true;
try {
    Map;
}
catch (e) {
    isMapSupported = false;
    console.log("Map is not supported.");
}

function jsponClone(objTracker, oldValue, id) {
    if (typeof oldValue === 'object' && oldValue !== null &&
        !(oldValue instanceof Boolean) &&
        !(oldValue instanceof Date) &&
        !(oldValue instanceof Number) &&
        !(oldValue instanceof RegExp) &&
        !(oldValue instanceof String)) {
        if (isMapSupported) {
            if (objTracker.has(oldValue)) {
                return { '$ref': objTracker.get(oldValue) };
            }
        } else {
            if (Object.prototype.hasOwnProperty.call(oldValue, idFieldName)) {
                return { '$ref': oldValue[idFieldName] };
            }
        }
        var newValue = oldValue.constructor();
        var isArray = oldValue.constructor === Array;
        if (isArray) {
            var arraySectionObj = newValue;
        }
        if (useIdBase) {
            if (preserveArrays && isArray) {
                newValue = { '$values': newValue };
            }
            if (!(preserveArrays === false && isArray)) {
                id.uniqueId++;
                if (isMapSupported) {
                    objTracker.set(oldValue, id.uniqueId);
                    newValue[idFieldName] = id.uniqueId;
                } else {
                    oldValue[idFieldName] = id.uniqueId;
                    objTracker[id.uniqueId] = oldValue;
                    newValue[idFieldName] = id.uniqueId;
                }
            }
        } else {
            if (!(preserveArrays === false && isArray)) {
                if (isMapSupported) {
                    objTracker.set(oldValue, id);
                } else {
                    oldValue[idFieldName] = id;
                    objTracker[id] = oldValue;
                    objTracker['new' + id] = newValue;
                }
            }
        }

        if (isArray) {
            for (var i = 0; i < oldValue.length; i++) {
                arraySectionObj.push(jsponClone(objTracker, oldValue[i], useIdBase ? id : id + '[' + i + ']'));
            }
        } else {
            for (var key in oldValue) {
                if (Object.prototype.hasOwnProperty.call(oldValue, key)) {
                    newValue[key] = jsponClone(
                        objTracker, 
                        oldValue[key], 
                            useIdBase 
                                ? id 
                                : useJSONPathDotNotation 
                                    ? id + '.' + key 
                                    : id + '[\'' + key + '\']');
                }
            }
        }
        return newValue;
    }
    return oldValue;
}

function jsponParse(objTracker, obj, id) {
    if (obj && typeof obj === 'object') {
        if (Object.prototype.hasOwnProperty.call(obj, '$ref')) {
            return objTracker[obj['$ref']];
        }
        if (Object.prototype.hasOwnProperty.call(obj, '$values') && preserveArrays && useIdBase) {
            obj = obj['$values'];
        }
        objTracker[id] = obj;
        if (obj.constructor === Array) {
            for (var i = 0; i < obj.length; i++) {
                obj[i] = jsponParse(
                    objTracker, 
                    obj[i], 
                    useIdBase
                        ? obj[i]
                            ? obj[i][idFieldName]
                            : null
                        : id + '[' + i + ']');
            }
        } else {
            for (var key in obj) {
                obj[key] = jsponParse(
                    objTracker, 
                    obj[key], 
                    useIdBase
                        ? obj[key]
                            ? obj[key][idFieldName]
                            : null
                        : useJSONPathDotNotation 
                            ? id + '.' + key 
                            : id + '[\'' + key + '\']');
            }
        }
        if (useIdBase) delete obj[idFieldName];
    }
    return obj;
}

exports.stringify = function (obj) {
    var objTracker = isMapSupported ? new Map() : {};
    var newObj = jsponClone(objTracker, obj, useIdBase ? { uniqueId: 0 } : jsonPathRoot);
    if (!isMapSupported) {
        for (var x in objTracker) {
            delete objTracker[x][idFieldName];
        }
    }
    return jsonStringifier(newObj);
}

exports.parse = function (str) {
    var obj = jsonParser(str);
    return jsponParse({}, obj, useIdBase ? obj[idFieldName] : jsonPathRoot);
}