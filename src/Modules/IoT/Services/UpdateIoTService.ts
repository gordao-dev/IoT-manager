import { IoT } from '@prisma/client';
import { Server } from 'socket.io';
import { inject, injectable } from 'tsyringe';
import HttpError from '../../../Shared/Infra/Http/Errors/HttpError';
import IUpdateIoT from '../@Types/IUpdateIoT';
import IIoTRepository from '../Reposotories/IIoTRepository';

@injectable()
class UpdateIoTService {
  constructor(
    @inject('IoTRepository')
    private ioTRepository: IIoTRepository,

    @inject('SocketIO')
    private io: Server,
  ) {}

  public async execute({ id, ...data }: IUpdateIoT): Promise<IoT> {
    const ioT = await this.ioTRepository.findById(id);

    if (!ioT) {
      throw new HttpError('IoT not found', 404);
    }
    try {
      const updatedIoT = await this.ioTRepository.update({
        id,
        ...data,
      });

      this.io.emit('iotUpdated', updatedIoT);
      console.log('IoT updated successfully!');

      return updatedIoT;
    } catch (error) {
      console.log(error);
    }
  }
}

export default UpdateIoTService;
