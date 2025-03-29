import { ListData } from '@/common/types';

// -----------List Item--------------
let listData: ListData[] = [];

export const getListData = () => {
  return listData;
};

export const setListData = (data: ListData[]) => {
  listData = data;
};
// -----------------------------------
