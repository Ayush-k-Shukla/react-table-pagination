import { TableDataEntity } from './interface';

function convertToCSV(arr: TableDataEntity[]) {
  const array = [Object.keys(arr[0]) as TableDataEntity[]].concat(arr);

  return array
    .map((it) => {
      return Object.values(it).toString();
    })
    .join('\n');
}

export const downloadCSV = function (data: TableDataEntity[]) {
  const blob = new Blob([convertToCSV(data)], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'filename';
  link.click();
};

export const getFilterStateByName = (
  data: TableDataEntity,
  name: string
): number | string => {
  switch (name) {
    case 'name':
      return data.name!;
    case 'status':
      return data.status!;
    case 'gender':
      return data.gender!;
    case 'id':
      return data.id!;
  }
  return 1;
};

export const sortData = (
  data: TableDataEntity[],
  field: string,
  order: number
) => {
  data.sort((a, b) =>
    getFilterStateByName(a, field) > getFilterStateByName(b, field)
      ? order * 1
      : getFilterStateByName(b, field) > getFilterStateByName(a, field)
      ? order * -1
      : 0
  );
  return data;
};

export const SUB_HEADING_MESSAGE =
  'Manage your team members and their account permission here.';

export const POSSIBLE_STATUS = ['active', 'inactive'];
export const POSSIBLE_GENDER = ['male', 'female'];
export const PAGE_LIMIT = 5;
export const TOTAL_USER = 2400;
