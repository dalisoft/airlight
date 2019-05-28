const jsonStrify = (jsonObject, replacer, space) => {
  if (jsonObject === undefined || jsonObject === null) {
    return "{}";
  }
  if (typeof jsonObject !== "object") {
    return jsonObject;
  }

  let result;

  if (jsonObject.length) {
    for (let i = 0, len = jsonObject.length; i < len; i++) {
      let value = jsonObject[i];

      if (value === undefined || value === null) {
        continue;
      }

      if (!result) {
        result = '"[';
      } else {
        result += ",";
      }

      if (replacer) {
        value = replacer(i, value);
      }

      if (typeof value === "string") {
        result += '"' + value + '"';
      } else if (typeof value === "number" || typeof value === "boolean") {
        result += value;
      } else if (typeof value === "object") {
        result += jsonStrify(value, replacer, space);
      }

      if (space) {
        if (typeof space === "number") {
          for (let s = 0; s < space; s++) {
            result += " ";
          }
        } else if (typeof space === "string") {
          result += space;
        }
      }
    }
    result += ']"';
  } else {
    for (const key in jsonObject) {
      let value = jsonObject[key];

      if (value === undefined || value === null) {
        continue;
      }

      if (!result) {
        result = "{";
      } else {
        result += ",";
      }

      result += '"' + key + '":';

      if (replacer) {
        value = replacer(key, value);
      }

      if (typeof value === "string") {
        result += '"' + value + '"';
      } else if (typeof value === "number" || typeof value === "boolean") {
        result += value;
      } else if (typeof value === "object") {
        result += jsonStrify(value, replacer, space);
      }
    }
    result += "}";
  }

  return result;
};

export default jsonStrify;
