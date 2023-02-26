import 'reflect-metadata';
import HttpError from '../../../Shared/Infra/Http/Errors/HttpError';
import IoTRepositoryMock from '../Infra/TypeORM/Repositories/IoTRepositoryMock';
import findIoTByIdService from './FindIoTByIdService';

const mockIoTRepository = {
  findById: jest.fn(),
};

describe('findIoTByIdService', () => {
  let findIoTById: findIoTByIdService;

  beforeEach(() => {
    findIoTById = new findIoTByIdService(
      mockIoTRepository as IoTRepositoryMock,
    );
  });

  it('should be able to find an IoT device by ID', async () => {
    const iot = { id: 'iot-id', details: [] };
    mockIoTRepository.findById.mockImplementationOnce(() =>
      Promise.resolve(iot),
    );

    const response = await findIoTById.execute({ id: 'iot-id' });

    expect(mockIoTRepository.findById).toHaveBeenCalledWith('iot-id');
    expect(response.iot).toEqual(iot);
  });

  it('should throw an HttpError when the IoT device is not found', async () => {
    expect.assertions(2);
    mockIoTRepository.findById.mockImplementationOnce(() =>
      Promise.resolve(null),
    );

    try {
      await findIoTById.execute({ id: 'iot-id' });
    } catch (error) {
      expect(mockIoTRepository.findById).toHaveBeenCalledWith('iot-id');
      expect(error).toBeInstanceOf(HttpError);
    }
  });
});
