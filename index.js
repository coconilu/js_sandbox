class VM {
  static proxyMap = new WeakMap();
  #sandbox;
  constructor(vmContext) {
    this["#createSandbox"](vmContext);
  }
  #get(target, key) {
    if (key === Symbol.unscopables) return undefined;
    return target[key];
  }
  #has(target, key) {
    return true;
  }
  #createSandbox(vmContext) {
    if (!VM.proxyMap.has(vmContext)) {
      let vmProxy = new Proxy(vmContext, {
        get: this["#get"],
        has: this["#has"],
      });
      VM.proxyMap.set(vmContext, vmProxy);
    }
    this.#sandbox = VM.proxyMap.get(vmContext);
  }
  run(code) {
    if (this["#sandbox"]) {
      const template = `with (sandbox) {${code}}`;
      const templateFunction = new Function("sandbox", template);
      return templateFunction(this["#sandbox"]);
    }
  }
}
