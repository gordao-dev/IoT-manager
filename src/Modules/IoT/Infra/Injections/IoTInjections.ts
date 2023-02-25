import { container } from 'tsyringe';
import IIoTRepository from '../../Reposotories/IIoTRepository';
import IoTRepository from '../TypeORM/Repositories/IoTRepository';

class IoTInjections {
  public register(): void {
    container.registerSingleton<IIoTRepository>('IoTRepository', IoTRepository);
  }
}

export default IoTInjections;
