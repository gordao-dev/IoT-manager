interface Details {
  id: string;
  label: string;
  value: string;
}

interface IUpdateIoT {
  id: string;
  details: Details[];
}

export default IUpdateIoT;
