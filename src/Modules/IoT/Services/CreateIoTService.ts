import { IoT } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ObjectId } from 'mongodb';

import IIoTRepository from '../Reposotories/IIoTRepository';
import HttpError from '../../../Shared/Infra/Http/Errors/HttpError';

interface ICreateIoTRequest {
  details: {
    label: string;
    value: string;
  }[];
}

interface ICreateIoTResponse {
  iot: IoT;
}

@injectable()
class CreateIoTService {
  constructor(
    @inject('IoTRepository')
    private IoTRepository: IIoTRepository,
  ) {}

  public async execute({
    details,
  }: ICreateIoTRequest): Promise<ICreateIoTResponse> {
    const detailsWithIds = details.map(d => ({
      id: new ObjectId(),
      ...d,
    }));

    const nonNumericRegex = /\D/;

    details.forEach(detail => {
      const containsNonNumeric = nonNumericRegex.test(detail.value);

      if (!containsNonNumeric) {
        throw new HttpError('Required unit of measurement');
      }
    });

    const iot = await this.IoTRepository.create({
      details: detailsWithIds,
    });

    return {
      iot,
    };
  }
}

export default CreateIoTService;
