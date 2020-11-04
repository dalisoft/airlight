import {
  Sheets,
  Resource,
  Error,
  Response,
  ObjStringAny
} from '../ts-interfaces';
import { parseTypes } from '../helpers/index';

const insertRows = (
  range: string,
  spreadsheetId: string,
  sheets: Sheets,
  auth: any,
  fields: string[],
  row: ObjStringAny | ObjStringAny[]
) => {
  const values = Array.isArray(row)
    ? row.map((row: ObjStringAny) =>
        fields.map((field: string): any => parseTypes(row[field], false))
      )
    : [fields.map((field: string) => parseTypes(row[field], false))];

  const resource: Resource = {
    values
  };

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.append(
      {
        resource,
        auth,
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS'
      },
      (err: Error, res: Response) => {
        if (err) {
          return reject(err);
        }
        resolve(res.data);
      }
    );
  });
};

export { insertRows as insert };
