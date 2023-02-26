import 'reflect-metadata';
import IoTRepositoryMock from '../Infra/TypeORM/Repositories/IoTRepositoryMock';
import IndexIoTsService from './IndexIoTSerrvice';

describe('IndexIoTsService', () => {
  it('should be able to list all IoTs', async () => {
    const ioTRepositoryMock = new IoTRepositoryMock();

    const indexIoTsService = new IndexIoTsService(ioTRepositoryMock);

    const iots = await indexIoTsService.execute({});

    expect(ioTRepositoryMock.find).toHaveBeenCalled();
    expect(iots).toHaveProperty('iots');
  });
});
