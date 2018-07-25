const JSPON = require('../jspon.js');
const mock = require('./mock.js');
const assert = require('assert').strict;

function checkForEqualityAgainstMock(generatedObj, preserveArrays) {
    expect(generatedObj.a).toBe(generatedObj.c);
    expect(generatedObj.a.parent).toBe(generatedObj);
    expect(generatedObj.b.parent).toBe(generatedObj);
    expect(generatedObj.a).toBe(generatedObj.c);
    expect(generatedObj.a).toBe(generatedObj.b.child.e.f.g);
    expect(generatedObj.b).toBe(generatedObj.d);
    if (preserveArrays === true) {
        expect(generatedObj.h).toBe(generatedObj.j);
    } else {
        expect(generatedObj.h).not.toBe(generatedObj.j);
    }
    expect(generatedObj.h).not.toBe(generatedObj.i);
    expect(generatedObj.a).not.toBe(generatedObj.b);
    expect(generatedObj.b).not.toBe(generatedObj.c);
    expect(generatedObj.h[0]).toBe(generatedObj.a);
    expect(generatedObj.h[1]).toBe(generatedObj.b);
    expect(generatedObj.h[2]).toBe(generatedObj.c);
    expect(generatedObj.h[3]).toBe(generatedObj.d);
    expect(generatedObj.i[0]).toBe(generatedObj.a);
    expect(generatedObj.i[1]).toBe(generatedObj.c);
    expect(generatedObj.i[2]).toBe(generatedObj.c);
    expect(generatedObj.i[3]).toBe(generatedObj.d);
    expect(generatedObj.l.m.n.o.p.q).toBe(generatedObj.a);
    expect(generatedObj.s).toBe(generatedObj.l.m.n.o.p);
    expect(generatedObj.t).toBe(generatedObj.h[4]);
    expect(generatedObj.t.tt).toBe(null);
    expect(generatedObj.x).toBe(null);
    expect(generatedObj.z).toBe(null);
    expect(generatedObj.l.m.n.pp).toBe(null);
    assert.deepEqual(generatedObj, mock.getMockObj());
}

function getStringifyMockObj() {
    var parent = { name: 'parent' };
    var child1 = { name: 'John', parent: parent };
    var child2 = { name: 'Jane', parent: parent };
    var children = [child1, child2];
    parent.children = children;
    parent.childrenCopy = children;
    parent.child1 = child1;
    parent.child2 = child2;
    return parent;
}

function printDoc(obj) {
    //Documentation        
    console.log("**" + obj.name + "**");
    console.log("```");
    console.log("const JSPON = require('jspon');");
    if (obj.setting) {
        console.log(obj.setting);
    }
    console.log("");
    console.log("var json = JSPON.stringify(getObjWithCircularRef());");
    console.log("");
    console.log("var obj = JSPON.parse(json);");
    console.log("");
    console.log("//Value of json variable");
    console.log("//" + obj.expectedValue);
    console.log("```");
}

describe("A suite", function () {
    it("Test Settings 1", function () {
        var settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48');
        expect(settings.useIdBase).toBe(false);
        expect(settings.preserveArrays).toBe(true);
        expect(settings.jsonPathRoot).toBe('$');
        expect(settings.jsonPathFormat).toBe('DotNotation');
    });

    it("Test Settings 2", function () {
        var settings = JSPON.setSettings({
            idFieldName: '$jspon$',
            preserveArrays: false
        });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('$jspon$');
        expect(settings.useIdBase).toBe(true);
        expect(settings.preserveArrays).toBe(false);
        expect(settings.jsonPathRoot).toBe(undefined);
        expect(settings.jsonPathFormat).toBe('DotNotation');
    });

    it("Test Settings 3", function () {
        var settings = JSPON.setSettings({
            preserveArrays: true,
            jsonPathRoot: '#',
            jsonPathFormat: 'BracketNotation'
        });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48');
        expect(settings.useIdBase).toBe(false);
        expect(settings.preserveArrays).toBe(true);
        expect(settings.jsonPathRoot).toBe('#');
        expect(settings.jsonPathFormat).toBe('BracketNotation');
    });

    it("Test Settings 4", function () {
        var settings = JSPON.setSettings();
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48');
        expect(settings.useIdBase).toBe(false);
        expect(settings.preserveArrays).toBe(true);
        expect(settings.jsonPathRoot).toBe('$');
        expect(settings.jsonPathFormat).toBe('DotNotation');
    });

    it("Test Id reference with preserveArrays = false", function () {
        JSPON.setSettings({ idFieldName: '$id', preserveArrays: false });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('$id');
        expect(settings.useIdBase).toBe(true);
        expect(settings.preserveArrays).toBe(false);
        expect(settings.jsonPathRoot).toBe(undefined);
        expect(settings.jsonPathFormat).toBe('DotNotation');
        var str = JSPON.stringify(mock.getMockObj());
        var v = JSPON.parse(str);
        checkForEqualityAgainstMock(v, false);
    });

    it("Test Id reference with preserveArrays = true", function () {
        JSPON.setSettings({ idFieldName: '$id' });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('$id');
        expect(settings.useIdBase).toBe(true);
        expect(settings.preserveArrays).toBe(true);
        expect(settings.jsonPathRoot).toBe(undefined);
        expect(settings.jsonPathFormat).toBe('DotNotation');
        var str = JSPON.stringify(mock.getMockObj());
        var v = JSPON.parse(str);
        checkForEqualityAgainstMock(v, true);
    });

    it("Test jsonPath reference with preserveArrays = false", function () {
        JSPON.setSettings({ jsonPathRoot: '$', preserveArrays: false });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48');
        expect(settings.useIdBase).toBe(false);
        expect(settings.preserveArrays).toBe(false);
        expect(settings.jsonPathRoot).toBe('$');
        expect(settings.jsonPathFormat).toBe('DotNotation');
        var str = JSPON.stringify(mock.getMockObj());
        var v = JSPON.parse(str);
        checkForEqualityAgainstMock(v, false);
    });

    it("Test jsonPath reference with preserveArrays = true", function () {
        JSPON.setSettings({ jsonPathRoot: '$' });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48');
        expect(settings.useIdBase).toBe(false);
        expect(settings.preserveArrays).toBe(true);
        expect(settings.jsonPathRoot).toBe('$');
        expect(settings.jsonPathFormat).toBe('DotNotation');
        var str = JSPON.stringify(mock.getMockObj());
        var v = JSPON.parse(str);
        checkForEqualityAgainstMock(v, true);
    });    

    it("Test stringify - jsonPath reference with preserveArrays = true", function () {
        JSPON.setSettings({ jsonPathRoot: '$' });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48');
        expect(settings.useIdBase).toBe(false);
        expect(settings.preserveArrays).toBe(true);
        expect(settings.jsonPathRoot).toBe('$');
        expect(settings.jsonPathFormat).toBe('DotNotation');
        var expectedValue = '{"name":"parent","children":[{"name":"John","parent":{"$ref":"$"}},{"name":"Jane","parent":{"$ref":"$"}}],"childrenCopy":{"$ref":"$.children"},"child1":{"$ref":"$.children[0]"},"child2":{"$ref":"$.children[1]"}}';
        expect(JSPON.stringify(getStringifyMockObj())).toBe(expectedValue);

        //Documentation
        printDoc({
            name: 'Default Settings jsonPath reference with preserveArrays = true',
            expectedValue: expectedValue
        });
    });

    it("Test stringify - jsonPath reference with preserveArrays = false", function () {
        JSPON.setSettings({ jsonPathRoot: '$', preserveArrays: false });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48');
        expect(settings.useIdBase).toBe(false);
        expect(settings.preserveArrays).toBe(false);
        expect(settings.jsonPathRoot).toBe('$');
        expect(settings.jsonPathFormat).toBe('DotNotation');
        var expectedValue = '{"name":"parent","children":[{"name":"John","parent":{"$ref":"$"}},{"name":"Jane","parent":{"$ref":"$"}}],"childrenCopy":[{"$ref":"$.children[0]"},{"$ref":"$.children[1]"}],"child1":{"$ref":"$.children[0]"},"child2":{"$ref":"$.children[1]"}}';
        expect(JSPON.stringify(getStringifyMockObj())).toBe(expectedValue);

        //Documentation
        printDoc({
            name: 'jsonPath reference with preserveArrays = false',
            setting: "JSPON.setSettings({ preserveArrays: false });",
            expectedValue: expectedValue
        });
    });

    it("Test stringify - Id reference with preserveArrays = true", function () {
        JSPON.setSettings({ idFieldName: '$id' });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('$id');
        expect(settings.useIdBase).toBe(true);
        expect(settings.preserveArrays).toBe(true);
        expect(settings.jsonPathRoot).toBe(undefined);
        expect(settings.jsonPathFormat).toBe('DotNotation');
        var expectedValue = '{"$id":1,"name":"parent","children":{"$values":[{"$id":3,"name":"John","parent":{"$ref":1}},{"$id":4,"name":"Jane","parent":{"$ref":1}}],"$id":2},"childrenCopy":{"$ref":2},"child1":{"$ref":3},"child2":{"$ref":4}}';
        expect(JSPON.stringify(getStringifyMockObj())).toBe(expectedValue);

        //Documentation
        printDoc({
            name: 'Id reference with preserveArrays = true',
            setting: "JSPON.setSettings({ idFieldName: '$id' });",
            expectedValue: expectedValue
        });
    });

    it("Test stringify - Id reference with preserveArrays = false", function () {
        JSPON.setSettings({ idFieldName: '$id', preserveArrays: false });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('$id');
        expect(settings.useIdBase).toBe(true);
        expect(settings.preserveArrays).toBe(false);
        expect(settings.jsonPathRoot).toBe(undefined);
        expect(settings.jsonPathFormat).toBe('DotNotation');
        var expectedValue = '{"$id":1,"name":"parent","children":[{"$id":2,"name":"John","parent":{"$ref":1}},{"$id":3,"name":"Jane","parent":{"$ref":1}}],"childrenCopy":[{"$ref":2},{"$ref":3}],"child1":{"$ref":2},"child2":{"$ref":3}}';
        expect(JSPON.stringify(getStringifyMockObj())).toBe(expectedValue);

        //Documentation
        printDoc({
            name: 'Id reference with preserveArrays = false',
            setting: "JSPON.setSettings({ idFieldName: '$id', preserveArrays: false });",
            expectedValue: expectedValue
        });

    });

    it("Test stringify - jsonPath reference with preserveArrays = true and jsonPathFormat = Bracket-Notation", function () {
        JSPON.setSettings({ jsonPathRoot: '$', jsonPathFormat: 'BracketNotation' });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48');
        expect(settings.useIdBase).toBe(false);
        expect(settings.preserveArrays).toBe(true);
        expect(settings.jsonPathRoot).toBe('$');
        expect(settings.jsonPathFormat).toBe('BracketNotation');
        var expectedValue = '{"name":"parent","children":[{"name":"John","parent":{"$ref":"$"}},{"name":"Jane","parent":{"$ref":"$"}}],"childrenCopy":{"$ref":"$[\'children\']"},"child1":{"$ref":"$[\'children\'][0]"},"child2":{"$ref":"$[\'children\'][1]"}}';
        expect(JSPON.stringify(getStringifyMockObj())).toBe(expectedValue);

        //Documentation
        printDoc({
            name: 'jsonPath reference with preserveArrays = true with Bracket-Notation',
            setting: "JSPON.setSettings({ jsonPathFormat: 'BracketNotation' });",
            expectedValue: expectedValue
        });
    });

    it("Test stringify - jsonPath reference with preserveArrays = false with Bracket-Notation", function () {
        JSPON.setSettings({ jsonPathRoot: '$', preserveArrays: false, jsonPathFormat: 'BracketNotation' });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48');
        expect(settings.useIdBase).toBe(false);
        expect(settings.preserveArrays).toBe(false);
        expect(settings.jsonPathRoot).toBe('$');
        expect(settings.jsonPathFormat).toBe('BracketNotation');
        var expectedValue = '{"name":"parent","children":[{"name":"John","parent":{"$ref":"$"}},{"name":"Jane","parent":{"$ref":"$"}}],"childrenCopy":[{"$ref":"$[\'children\'][0]"},{"$ref":"$[\'children\'][1]"}],"child1":{"$ref":"$[\'children\'][0]"},"child2":{"$ref":"$[\'children\'][1]"}}';
        expect(JSPON.stringify(getStringifyMockObj())).toBe(expectedValue);

        //Documentation
        printDoc({
            name: 'jsonPath reference with preserveArrays = false and jsonPathFormat = Bracket-Notation',
            setting: "JSPON.setSettings({ preserveArrays: false, jsonPathFormat: 'BracketNotation' });",
            expectedValue: expectedValue
        });
    });
});
