import { IoT } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IFilterIoTs from '../@Types/IFilterIots';
import IIoTRepository from '../Reposotories/IIoTRepository';

interface IResponse {
  iots: IoT[];
}

@injectable()
class IndexIoTsService {
  constructor(
    @inject('IoTRepository')
    private ioTRepository: IIoTRepository,
  ) {}

  public async execute(data: IFilterIoTs): Promise<IResponse> {
    const result = await this.ioTRepository.find(data);

    return result;
  }
}

export default IndexIoTsService;
