// define a property to only target importys
Object.defineProperty(exports, "__esModule", {
  value: true,
});
const { defineProperty } = Object;
Object.defineProperty = function (object, name, meta) {
  // Check if object is import and has a getter and is non-configurable
  if (object.__esModule && meta.get && !meta.configurable && !meta.set) {
    const getter = meta && meta.get;
    try {
      const originalValue = getter && getter();
      let currentValue = originalValue;
      let isMocked = false;

      return defineProperty(object, name, {
        ...meta,
        get: () => (isMocked ? currentValue : getter && getter()), // setting the getter from setter or default
        set(newValue) {
          // define setter property which can be used to jest.spyOn
          isMocked = newValue !== originalValue;
          currentValue = newValue;
        },
        configurable: true, // prevent freezing
      });
    } catch (e) {
      return defineProperty(object, name, meta);
    }
  }

  return defineProperty(object, name, meta);
};
