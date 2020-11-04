interface IndexRage {
  column: string;
  index: number;
}

export interface RowIndexReturn {
  startRowColumn?: string;
  startRowIndex?: number;
  endRowColumn?: string;
  endRowIndex?: number;
}

const getRowsIndex = (
  range: string[] | string
): RowIndexReturn | RowIndexReturn[] | any => {
  if (Array.isArray(range)) {
    return range.map(getRowsIndex) as RowIndexReturn[];
  }
  const splitRange: string = range.split('!')[1];
  const splitIndex: string[] = splitRange.split(':');
  const indexMap: IndexRage[] = splitIndex.map(
    (v: string): IndexRage => ({
      column: v[0],
      index: +v[1]
    })
  );
  if (indexMap.length === 2) {
    const [start, end] = indexMap;

    return {
      startRowColumn: start.column,
      startRowIndex: start.index,
      endRowColumn: end.column,
      endRowIndex: end.index
    };
  }
  if (indexMap.length === 0) {
    return {};
  }

  const [item] = indexMap;

  return {
    startRowColumn: item.column,
    startRowIndex: item.index,
    endRowColumn: item.column,
    endRowIndex: item.index + 1
  };
};

export default getRowsIndex;
