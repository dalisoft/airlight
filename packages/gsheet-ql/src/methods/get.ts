import { Sheets, Error, Response, ObjStringAny } from '../ts-interfaces';
import { parseTypes, fieldsIntoObject } from '../helpers/index';

const getRows = (
  range: string | string[],
  spreadsheetId: string,
  sheets: Sheets,
  auth: any,
  batch?: boolean,
  fields?: string[],
  asRaw?: boolean
) => {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values[batch ? 'batchGet' : 'get'](
      {
        auth,
        spreadsheetId,
        ...(batch ? { ranges: range } : { range })
      },
      (err: Error, res: Response) => {
        if (err) {
          return reject(err);
        }

        resolve(
          (function parseValues(data: any, batch?: boolean, fields?: any): any {
            if (batch) {
              const ranges: string[] = range as string[];
              return ranges.reduce(
                (obj: any, range, i: number) =>
                  (obj[range] = data.valueRanges[i]
                    ? parseValues(
                        data.valueRanges[i],
                        false,
                        fields && Array.isArray(fields[i]) && fields[i]
                      )
                    : {}) && obj,
                {}
              );
            }
            {
              const { values } = data;

              if (values.length > 0) {
                const valueFields: any = fields || values.shift();

                if (asRaw) {
                  return {
                    fields: valueFields,
                    values: values.map(parseTypes)
                  };
                }
                return values.map((value: any[]): ObjStringAny[] =>
                  value
                    .map((val) => parseTypes(val))
                    .reduce(fieldsIntoObject(valueFields), {})
                );
              }
            }
          })(res.data, batch, fields)
        );
      }
    );
  });
};

export { getRows as get };
