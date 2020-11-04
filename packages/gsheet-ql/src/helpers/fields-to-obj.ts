const fieldsIntoObject = (fields: string[]) => (
  row: any,
  col: any,
  index: number
) => {
  const field: string = fields[index];
  row[field] = col;
  return row;
};

export default fieldsIntoObject;
