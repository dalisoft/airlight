import {
  Sheets,
  Error,
  Response,
  Resource,
  ObjStringAny
} from '../ts-interfaces';
import { parseTypes, getRowsIndexRange } from '../helpers/index';

const updateRows = (
  range: string | string[] | any,
  spreadsheetId: string,
  sheets: Sheets,
  auth: any,
  fields: any[],
  row: ObjStringAny | ObjStringAny[] | any,
  batch?: boolean
) => {
  let isDelete = false;
  if (typeof row === 'string' || typeof row === 'number') {
    row = batch && range ? range.map(() => [row]) : [row];
  } else if (typeof row === 'object' && !Array.isArray(row) && !!row) {
    row = [row];
  } else if (row === undefined || row === null) {
    isDelete = true;
  }
  if (batch && !Array.isArray(range)) {
    range = [range];
  }
  const requests: any[] = [];
  const values =
    !isDelete &&
    (batch && Array.isArray(range)
      ? range.map((range) => ({
          range,
          values: row.map(
            (row: ObjStringAny | string | any, rowIndex: number) =>
              Array.isArray(fields[0])
                ? fields[rowIndex].map((field: string): any =>
                    row === '' ? '' : parseTypes(row[field], false)
                  )
                : fields.map((field: string): any =>
                    row === '' ? '' : parseTypes(row[field], false)
                  )
          )
        }))
      : row.map((row: string | ObjStringAny | any) =>
          fields.map((field: string): any =>
            row === '' ? '' : parseTypes(row[field], false)
          )
        ));

  const resource: Resource = {};

  if (values) {
    if (batch && Array.isArray(range)) {
      resource.data = values;
    } else {
      resource.values = values;
    }
  }

  if (isDelete) {
    const rangeRequest = getRowsIndexRange(range);
    rangeRequest.forEach((req: any) => {
      const deleteRequest = {
        deleteDimension: {
          range: {
            sheetId: spreadsheetId,
            dimension: 'ROWS',
            startIndex: req.startRowIndex,
            endIndex: req.endRowIndex
          }
        }
      };
      requests.push(deleteRequest);
    });
    resource.requests = requests;
  }

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values[batch ? 'batchUpdate' : 'update'](
      {
        auth,
        spreadsheetId,
        resource,
        ...(batch ? {} : { range, valueInputOption: 'USER_ENTERED' })
      },
      (err: Error, res: Response) => {
        if (err) {
          return reject(err);
        }

        resolve(
          (function parseValues(data: any, batch?: boolean): any {
            if (batch) {
              const ranges: string[] = range as string[];
              return ranges.reduce(
                (obj: any, range, i: number) =>
                  (obj[range] = data.valueRanges
                    ? parseValues(data.valueRanges[i])
                    : {}) && obj,
                {}
              );
            }
            {
              const { updatedRange } = data;

              return updatedRange;
            }
          })(res.data, batch)
        );
      }
    );
  });
};

export { updateRows as update };
