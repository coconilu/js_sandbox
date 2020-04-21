"use strict";

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

class VM {
  constructor(_vmContext) {
    _createSandbox.add(this);

    _has.add(this);

    _get.add(this);

    _sandbox.set(this, {
      writable: true,
      value: void 0
    });

    this["#createSandbox"](_vmContext);
  }

  run(code) {
    if (this["#sandbox"]) {
      const template = "with (sandbox) {".concat(code, "}");
      const templateFunction = new Function("sandbox", template);
      return templateFunction(this["#sandbox"]);
    }
  }

}

var _sandbox = new WeakMap();

var _get = new WeakSet();

var _has = new WeakSet();

var _createSandbox = new WeakSet();

_defineProperty(VM, "proxyMap", new WeakMap());

var _get2 = function _get2(target, key) {
  if (key === Symbol.unscopables) return undefined;
  return target[key];
};

var _has2 = function _has2(target, key) {
  return true;
};

var _createSandbox2 = function _createSandbox2(vmContext) {
  if (!VM.proxyMap.has(vmContext)) {
    let vmProxy = new Proxy(vmContext, {
      get: this["#get"],
      has: this["#has"]
    });
    VM.proxyMap.set(vmContext, vmProxy);
  }

  _classPrivateFieldSet(this, _sandbox, VM.proxyMap.get(vmContext));
};