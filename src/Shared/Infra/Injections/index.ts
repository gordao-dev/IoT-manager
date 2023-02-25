import IoTInjections from '../../../Modules/IoT/Infra/Injections/IoTInjections';
import SocketIoInjections from '../../../Modules/IoT/Infra/Injections/socketInjections';

class Injections {
  public register() {
    const iotInjections = new IoTInjections();
    iotInjections.register();

    const socketIoInjections = new SocketIoInjections();
    socketIoInjections.register();
  }
}

export default Injections;
