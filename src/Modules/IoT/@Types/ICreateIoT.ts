interface Details {
  label: string;
  value: string;
}

interface ICreateIoT {
  id?: string;
  dataRead?: Date;
  details: Details[];
}

export default ICreateIoT;
