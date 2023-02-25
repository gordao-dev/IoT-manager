import IObject from './IObject';

interface IPagination<T = IObject> {
  page?: number;
  limit?: number;
  orderBy?: keyof T;
  iots?: string[];
}

export default IPagination;
