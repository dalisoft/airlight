const parseTypes = (
  value: string,
  nonPrimitiveEnforce: boolean = true
): number | object | any[] | string => {
  if (!isNaN(+value)) {
    return +value;
  }
  if (
    !nonPrimitiveEnforce &&
    value &&
    (value.charAt(0) === '{' || value.charAt(0) === '[')
  ) {
    return JSON.parse(value);
  }
  return value;
};

export default parseTypes;
