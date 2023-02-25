import { inject, injectable } from 'tsyringe';

import HttpError from '../../../Shared/Infra/Http/Errors/HttpError';
import IIoTRepository from '../Reposotories/IIoTRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteIoTService {
  constructor(
    @inject('IoTRepository')
    private ioTRepository: IIoTRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const iot = await this.ioTRepository.findById(id);
    if (!iot) {
      throw new HttpError('IoT not found', 404);
    }

    await this.ioTRepository.delete(iot.id);
  }
}

export default DeleteIoTService;
