import 'reflect-metadata';
import UpdateIoTService from './UpdateIoTService';
import IUpdateIoT from '../@Types/IUpdateIoT';
import IoTRepositoryMock from '../Infra/TypeORM/Repositories/IoTRepositoryMock';

describe('UpdateIoTService', () => {
  let updateIoTService: UpdateIoTService;
  let ioTRepositoryMock: IoTRepositoryMock;
  let socketIOMock: { emit: jest.Mock };

  beforeEach(() => {
    ioTRepositoryMock = new IoTRepositoryMock();
    socketIOMock = { emit: jest.fn() };
    updateIoTService = new UpdateIoTService(
      ioTRepositoryMock,
      socketIOMock as any,
    );
  });

  it('should update an IoT', async () => {
    const id = 'valid-id';
    const data: IUpdateIoT = {
      id,
      details: [],
    };

    const updatedIoT = { id, ...data };

    ioTRepositoryMock.findById.mockResolvedValueOnce(updatedIoT);
    ioTRepositoryMock.update.mockResolvedValueOnce(updatedIoT);

    const result = await updateIoTService.execute({ id, ...data });

    expect(result).toEqual(updatedIoT);
    expect(ioTRepositoryMock.findById).toHaveBeenCalledWith(id);
    expect(ioTRepositoryMock.update).toHaveBeenCalledWith({ id, ...data });
    expect(socketIOMock.emit).toHaveBeenCalledWith('iotUpdated', updatedIoT);
  });

  it('should throw HttpError when IoT is not found', async () => {
    const id = 'invalid-id';
    const data: IUpdateIoT = {
      id,
      details: [],
    };

    ioTRepositoryMock.findById.mockResolvedValueOnce(null);

    await expect(updateIoTService.execute({ id, ...data })).rejects.toThrow(
      'IoT not found',
    );
    expect(ioTRepositoryMock.findById).toHaveBeenCalledWith(id);
    expect(ioTRepositoryMock.update).not.toHaveBeenCalled();
    expect(socketIOMock.emit).not.toHaveBeenCalled();
  });
});
