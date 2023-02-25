interface Details {
  label: string;
  value: string;
}

interface IFilterIoT {
  page?: number;
  limit?: number;
  details?: Details[];
}

export default IFilterIoT;
