const pick = (
  object: Record<string, any>,
  keys: string[]
): Record<string, any> => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as Record<string, any>);
};

export default pick;
