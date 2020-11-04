import { get, insert, update } from './methods/index';
import { Sheets, ObjStringAny } from './ts-interfaces';
export default class GSheetSQL {
  private spreadsheetId: string;
  private sheets: Sheets;
  private auth: any;
  constructor(spreadsheetId: string, sheets: Sheets, auth: any) {
    this.spreadsheetId = spreadsheetId;
    this.sheets = sheets;
    this.auth = auth;
  }
  get(
    range: string | string[],
    batch?: boolean,
    fields?: any,
    asRaw?: boolean
  ) {
    return get(
      range,
      this.spreadsheetId,
      this.sheets,
      this.auth,
      batch,
      fields,
      asRaw
    );
  }
  update(
    range: string | string[],
    fields: string[],
    rows: any,
    batch?: boolean
  ) {
    return update(
      range,
      this.spreadsheetId,
      this.sheets,
      this.auth,
      fields,
      rows,
      batch
    );
  }
  insert(range: string, fields: string[], rows: ObjStringAny | ObjStringAny[]) {
    return insert(
      range,
      this.spreadsheetId,
      this.sheets,
      this.auth,
      fields,
      rows
    );
  }
}
