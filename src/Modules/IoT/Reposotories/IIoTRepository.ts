import { IoT } from '@prisma/client';

import ICreateIoT from '../@Types/ICreateIoT';
import IFilterIoT from '../@Types/IFilterIoT';
import IPaginatedIoTs from '../@Types/IPaginatedIoTs';
import IUpdateIoT from '../@Types/IUpdateIoT';

interface IIoTRepository {
  create(data: ICreateIoT): Promise<IoT>;
  find(filter: IFilterIoT): Promise<IPaginatedIoTs>;
  findById(id: string): Promise<IoT | null>;
  update(data: IUpdateIoT): Promise<IoT>;
  delete(id: string): Promise<void>;
  save(iot: IoT): Promise<IoT>;
}

export default IIoTRepository;
