import { IoT } from '@prisma/client';

interface IPaginatedIoTs {
  iots: IoT[];
  total: number;
}

export default IPaginatedIoTs;
