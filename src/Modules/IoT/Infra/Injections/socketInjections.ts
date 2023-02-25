import { container } from 'tsyringe';
import { Server, Socket } from 'socket.io';

class SocketIoInjections {
  public register(): void {
    const io = new Server();
    container.registerInstance<Server>('SocketIO', io);
  }
}

export default SocketIoInjections;
