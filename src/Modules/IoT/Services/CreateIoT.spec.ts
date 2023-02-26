import 'reflect-metadata';
import IoTRepositoryMock from '../Infra/TypeORM/Repositories/IoTRepositoryMock';
import CreateIoTService from './CreateIoTService';

const mockIoTRepository = {
  create: jest.fn(),
};

describe('CreateIoTService', () => {
  let createIoTService: CreateIoTService;

  beforeEach(() => {
    createIoTService = new CreateIoTService(
      mockIoTRepository as IoTRepositoryMock,
    );
  });

  it('should be able to create an IoT device', async () => {
    const details = [
      { label: 'Temperature', value: '23 C' },
      { label: 'Humidity', value: '55 %' },
    ];

    const iot = { id: 'iot-id', details };

    mockIoTRepository.create.mockImplementationOnce(() => Promise.resolve(iot));

    const response = await createIoTService.execute({ details });

    expect(mockIoTRepository.create).toHaveBeenCalledWith({
      details: expect.any(Array),
    });
    expect(mockIoTRepository.create.mock.calls[0][0].details[0]).toMatchObject(
      details[0],
    );
    expect(mockIoTRepository.create.mock.calls[0][0].details[1]).toMatchObject(
      details[1],
    );

    expect(response.iot).toEqual(iot);
  });

  it('should throw an HttpError when the value does not contain unit of measurement', async () => {
    const details = [{ label: 'Temperature', value: '23' }];

    expect.assertions(1);

    try {
      await createIoTService.execute({ details });
    } catch (error) {
      expect(error.statusCode).toEqual(400);
    }
  });
});
