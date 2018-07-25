export function getMockObj() {
  var obj = {};
  obj.a = {aa: 5};
  obj.b = { bb: true, child: { cc: 1.2, e: { dd: 'test', f: { ee: 89, g: obj.a}}}};
  obj.a.parent = obj;
  obj.b.parent = obj;
  obj.c = obj.a;
  obj.d = obj.b;
  obj.t = { ff: 54, gg: false, tt: null };
  obj.h = [obj.a, obj.b, obj.c, obj.d, obj.t];
  obj.j = obj.h;
  obj.i = [obj.a, obj.c, obj.c, obj.d];
  obj.l = { hh: 't', m: { ii: 'p', n: { pp: null, jj: 34, o: { kk: 43, p: { ll: 'm', q: obj.a}}}}};
  obj.s = obj.l.m.n.o.p;
  obj.x = null;
  obj.z = null;
  return obj;
}

export function getArrayMockObj() {
  return [
    getMockObj(), getMockObj(), getMockObj(), getMockObj(), getMockObj(),
    getMockObj(), getMockObj(), getMockObj(), getMockObj(), getMockObj(),
    getMockObj(), getMockObj(), getMockObj(), getMockObj(), getMockObj(),
    getMockObj(), getMockObj(), getMockObj(), getMockObj(), getMockObj()
  ];
}
