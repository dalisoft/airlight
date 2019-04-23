export interface Sheets {
  spreadsheets: {
    values: {
      get: Function;
      batchGet: Function;
      update: Function;
      batchUpdate: Function;
      append: Function;
    };
  };
}
export interface Resource {
  values?: any[];
  requests?: any[];
  data?: any[];
}
export interface Error {
  message?: string;
  stack?: string;
}
export interface Response {
  config: {
    url: string;
    method: string;
    paramsSerializer: Function[];
    data: {
      values: any[];
    };
    headers: {
      [key: string]: string;
    };
    validateStatus: Function[];
    body: string;
    responseType: string;
  };
  data: {
    spreadsheetId: string;
    tableRange: string;
    values: any[] | any;
    updates: {
      [key: string]: string | number;
    };
  };
}
export interface ObjStringAny {
  [key: string]: any;
}
