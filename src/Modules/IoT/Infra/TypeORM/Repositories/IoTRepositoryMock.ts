import { IoT } from '@prisma/client';
import IIoTRepository from '../../../Reposotories/IIoTRepository';

class IoTRepositoryMock implements IIoTRepository {
  public create = jest.fn().mockImplementation(async (iot: IoT) => iot);
  public find = jest.fn().mockReturnValue({ iots: [] });
  public findById = jest.fn();
  public update = jest.fn();
  public delete = jest.fn();
  public save = jest.fn();
}

export default IoTRepositoryMock;
