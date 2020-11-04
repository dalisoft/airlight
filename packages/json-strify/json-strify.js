const compileJSON = require('compile-json-stringify');

module.exports = (schema) => {
  let isSchemaGenerated;
  let schemaStringify;
  let schemaPrevResponse;
  let prevObj;

  if (typeof schema === 'function') {
    schemaStringify = schema;
    isSchemaGenerated = true;
  } else if (typeof schema === 'object') {
    schema.strict = true;
    schamaStringify = compileJSON(schema);
    isSchemaGenerated = true;
  } else if (schema === undefined) {
    schema = {};
    isSchemaGenerated = false;
  }

  return function jsonStrify(
    jsonObject,
    jsonParent,
    topParent,
    jsonSchema = schema
  ) {
    if (jsonObject === undefined || jsonObject === null) {
      return '{}';
    }
    if (typeof jsonObject === 'string') {
      if (jsonObject.indexOf('"') !== -1) {
        return '"' + jsonObject.replace(/"/g, '\\"') + '"';
      }
      return jsonObject;
    } else if (typeof jsonObject !== 'object') {
      return jsonObject;
    }
    if (!jsonParent && isSchemaGenerated) {
      if (!schemaStringify) {
        jsonSchema.strict = true;
        schemaStringify = compileJSON(jsonSchema);
      } else if (jsonObject === prevObj) {
        return schemaPrevResponse;
      }
      prevObj = jsonObject;
      schemaPrevResponse = schemaStringify(jsonObject);
      return schemaPrevResponse;
    }
    let result;
    if (jsonObject.length) {
      if (!jsonSchema.type) {
        jsonSchema.type = 'array';
        jsonSchema.items = [];
      }
      for (let i = 0, len = jsonObject.length; i < len; i++) {
        let value = jsonObject[i];
        if (value === undefined || value === null) {
          if (!jsonSchema.items[i]) {
            jsonSchema.items[i] = { type: 'null' };
          }

          continue;
        }
        if (!result) {
          result = '[';
        } else {
          result += ',';
        }
        if (
          value === jsonObject ||
          value === jsonParent ||
          (jsonParent && value === topParent)
        ) {
          result += '"[Circular]"';
        } else if (typeof value === 'string') {
          if (value.indexOf('"') !== -1) {
            result += '"' + value.replace(/"/g, '\\"') + '"';
          } else {
            result += '"' + value + '"';
          }

          if (!jsonSchema.items[i]) {
            jsonSchema.items[i] = { type: 'string' };
          }
        } else if (typeof value === 'number' || typeof value === 'boolean') {
          result += value;

          if (!jsonSchema.items[i]) {
            jsonSchema.items[i] = { type: typeof value };
          }
        } else if (typeof value === 'object') {
          jsonObject.parent = jsonParent;

          if (!jsonSchema.items[i]) {
            jsonSchema.items[i] = {};
          }

          result += jsonStrify(
            value,
            jsonObject,
            jsonParent,
            jsonSchema.items[i]
          );
        }
      }
      result += ']';
    } else {
      if (!jsonSchema.type) {
        jsonSchema.type = 'object';
        jsonSchema.properties = {};
      }
      for (const key in jsonObject) {
        let value = jsonObject[key];
        if (value === undefined || value === null) {
          if (!jsonSchema.properties[key]) {
            jsonSchema.properties[key] = { type: 'null' };
          }

          continue;
        }
        if (!result) {
          result = '{';
        } else {
          result += ',';
        }
        result += '"' + key + '":';
        if (
          value === jsonObject ||
          value === jsonParent ||
          (jsonParent && value === topParent)
        ) {
          result += '"[Circular]"';
        } else if (typeof value === 'string') {
          if (value.indexOf('"') !== -1) {
            result += '"' + value.replace(/"/g, '\\"') + '"';
          } else {
            result += '"' + value + '"';
          }

          if (!jsonSchema.properties[key]) {
            jsonSchema.properties[key] = { type: 'string' };
          }
        } else if (typeof value === 'number' || typeof value === 'boolean') {
          result += value;

          if (!jsonSchema.properties[key]) {
            jsonSchema.properties[key] = { type: typeof value };
          }
        } else if (typeof value === 'object') {
          jsonObject.parent = jsonParent;

          if (!jsonSchema.properties[key]) {
            jsonSchema.properties[key] = {};
          }

          result += jsonStrify(
            value,
            jsonObject,
            jsonParent,
            jsonSchema.properties[key]
          );
        }
      }
      result += '}';
    }
    isSchemaGenerated = true;
    return result;
  };
};
