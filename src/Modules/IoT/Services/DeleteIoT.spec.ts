import 'reflect-metadata';
import DeleteIoTService from './DeleteIoTService';
import IoTRepositoryMock from '../Infra/TypeORM/Repositories/IoTRepositoryMock';

const mockIoTRepository = new IoTRepositoryMock();

describe('DeleteIoTService', () => {
  let deleteIoTService: DeleteIoTService;

  beforeEach(() => {
    deleteIoTService = new DeleteIoTService(mockIoTRepository);
  });

  it('should delete an IoT device', async () => {
    const iot = { id: 'iot-id', details: [] };

    mockIoTRepository.findById.mockImplementationOnce(() =>
      Promise.resolve(iot),
    );
    mockIoTRepository.delete.mockImplementationOnce(() => Promise.resolve());

    await deleteIoTService.execute({ id: iot.id });

    expect(mockIoTRepository.findById).toHaveBeenCalledWith(iot.id);
    expect(mockIoTRepository.delete).toHaveBeenCalledWith(iot.id);
  });

  it('should throw an HttpError when the IoT device is not found', async () => {
    const iot = { id: 'iot-id', details: [] };

    mockIoTRepository.findById.mockImplementationOnce(() =>
      Promise.resolve(null),
    );

    expect.assertions(1);

    try {
      await deleteIoTService.execute({ id: iot.id });
    } catch (error) {
      expect(error.statusCode).toEqual(404);
    }
  });
});
