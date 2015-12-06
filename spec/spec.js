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
    expect(true).toBe(_.isEqual(generatedObj, getMockObj()));
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

    it("Test Id reference with preserveArrays = false.", function () {
        JSPON.setSettings({ idFieldName: '$id', preserveArrays: false });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('$id');
        expect(settings.useIdBase).toBe(true);
        expect(settings.preserveArrays).toBe(false);
        expect(settings.jsonPathRoot).toBe(undefined);
        expect(settings.jsonPathFormat).toBe('DotNotation');
        var str = JSPON.stringify(getMockObj());
        var v = JSPON.parse(str);
        checkForEqualityAgainstMock(v, false);
    });

    it("Test Id reference with preserveArrays = true.", function () {
        JSPON.setSettings({ idFieldName: '$id' });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('$id');
        expect(settings.useIdBase).toBe(true);
        expect(settings.preserveArrays).toBe(true);
        expect(settings.jsonPathRoot).toBe(undefined);
        expect(settings.jsonPathFormat).toBe('DotNotation');
        var str = JSPON.stringify(getMockObj());
        var v = JSPON.parse(str);
        checkForEqualityAgainstMock(v, true);
    });

    it("Test jsonPath reference with preserveArrays = false.", function () {
        JSPON.setSettings({ jsonPathRoot: '$', preserveArrays: false });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48');
        expect(settings.useIdBase).toBe(false);
        expect(settings.preserveArrays).toBe(false);
        expect(settings.jsonPathRoot).toBe('$');
        expect(settings.jsonPathFormat).toBe('DotNotation');
        var str = JSPON.stringify(getMockObj());
        var v = JSPON.parse(str);
        checkForEqualityAgainstMock(v, false);
    });

    it("Test jsonPath reference with preserveArrays = true.", function () {
        JSPON.setSettings({ jsonPathRoot: '$' });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48');
        expect(settings.useIdBase).toBe(false);
        expect(settings.preserveArrays).toBe(true);
        expect(settings.jsonPathRoot).toBe('$');
        expect(settings.jsonPathFormat).toBe('DotNotation');
        var str = JSPON.stringify(getMockObj());
        var v = JSPON.parse(str);
        checkForEqualityAgainstMock(v, true);
    });

    it("Test stringify - Id reference with preserveArrays = false.", function () {
        JSPON.setSettings({ idFieldName: '$id', preserveArrays: false });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('$id');
        expect(settings.useIdBase).toBe(true);
        expect(settings.preserveArrays).toBe(false);
        expect(settings.jsonPathRoot).toBe(undefined);
        expect(settings.jsonPathFormat).toBe('DotNotation');
        expect(JSPON.stringify(getStringifyMockObj()), '{"$id":1,"name":"a","children":[{"$id":2,"name":"b"},{"$id":3,"name":"c"}],"favoriteChild":{"$ref":2},"childrenCopy":[{"$ref":2},{"$ref":3}]}');
    });

    it("Test stringify - Id reference with preserveArrays = true.", function () {
        JSPON.setSettings({ idFieldName: '$id' });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('$id');
        expect(settings.useIdBase).toBe(true);
        expect(settings.preserveArrays).toBe(true);
        expect(settings.jsonPathRoot).toBe(undefined);
        expect(settings.jsonPathFormat).toBe('DotNotation');
        expect(JSPON.stringify(getStringifyMockObj()), '{"$id":1,"name":"a","children":{"$values":[{"$id":3,"name":"b"},{"$id":4,"name":"c"}],"$id":2},"favoriteChild":{"$ref":3},"childrenCopy":{"$ref":2}}');
    });

    it("Test stringify - jsonPath reference with preserveArrays = false.", function () {
        JSPON.setSettings({ jsonPathRoot: '$', preserveArrays: false });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48');
        expect(settings.useIdBase).toBe(false);
        expect(settings.preserveArrays).toBe(false);
        expect(settings.jsonPathRoot).toBe('$');
        expect(settings.jsonPathFormat).toBe('DotNotation');
        expect(JSPON.stringify(getStringifyMockObj()), '{"name":"a","children":[{"name":"b"},{"name":"c"}],"favoriteChild":{"$ref":"$.children[0]"},"childrenCopy":[{"$ref":"$.children[0]"},{"$ref":"$.children[1]"}]}');
    });

    it("Test stringify - jsonPath reference with preserveArrays = false. (Bracket Notation)", function () {
        JSPON.setSettings({ jsonPathRoot: '$', preserveArrays: false, jsonPathFormat: 'BracketNotation' });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48');
        expect(settings.useIdBase).toBe(false);
        expect(settings.preserveArrays).toBe(false);
        expect(settings.jsonPathRoot).toBe('$');
        expect(settings.jsonPathFormat).toBe('BracketNotation');
        expect(JSPON.stringify(getStringifyMockObj()), '{"name":"a","children":[{"name":"b"},{"name":"c"}],"favoriteChild":{"$ref":"$[\'children\'][0]"},"childrenCopy":[{"$ref":"$[\'children\'][0]"},{"$ref":"$[\'children\'][1]"}]}');
    });

    it("Test stringify - jsonPath reference with preserveArrays = true.", function () {
        JSPON.setSettings({ jsonPathRoot: '$' });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48');
        expect(settings.useIdBase).toBe(false);
        expect(settings.preserveArrays).toBe(true);
        expect(settings.jsonPathRoot).toBe('$');
        expect(settings.jsonPathFormat).toBe('DotNotation');
        expect(JSPON.stringify(getStringifyMockObj()), '{"name":"a","children":[{"name":"b"},{"name":"c"}],"favoriteChild":{"$ref":"$.children[0]"},"childrenCopy":{"$ref":"$.children"}}');
    });

    it("Test stringify - jsonPath reference with preserveArrays = true. (Bracket Notation)", function () {
        JSPON.setSettings({ jsonPathRoot: '$', jsonPathFormat: 'BracketNotation' });
        settings = JSPON.getSettings();
        expect(settings.idFieldName).toBe('b5b813f0-9f2c-4fd5-893e-c1bc36f2aa48');
        expect(settings.useIdBase).toBe(false);
        expect(settings.preserveArrays).toBe(true);
        expect(settings.jsonPathRoot).toBe('$');
        expect(settings.jsonPathFormat).toBe('BracketNotation');
        expect(JSPON.stringify(getStringifyMockObj()), '{"name":"a","children":[{"name":"b"},{"name":"c"}],"favoriteChild":{"$ref":"$[\'children\'][0]"},"childrenCopy":{"$ref":"$[\'children\']"}}');
    });

    function getStringifyMockObj() {
        var child1 = { name: 'b' };
        var child2 = { name: 'c' };
        var children = [child1, child2];
        return { name: 'a', children: children, favoriteChild: child1, childrenCopy: children };
    }
});