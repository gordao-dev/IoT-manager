import { IoT } from '@prisma/client';
import { ObjectId } from 'mongodb';
import { inject, injectable } from 'tsyringe';
import HttpError from '../../../Shared/Infra/Http/Errors/HttpError';
import IIoTRepository from '../Reposotories/IIoTRepository';

interface IRequest {
  id?: string;
}

interface IResponse {
  iot: IoT;
}

@injectable()
class findIoTByIdService {
  constructor(
    @inject('IoTRepository')
    private IoTRepository: IIoTRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const iot = await this.IoTRepository.findById(id);

    if (!iot) {
      throw new HttpError('IoT not found', 404);
    }

    return {
      iot,
    };
  }
}

export default findIoTByIdService;
