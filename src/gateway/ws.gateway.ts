import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway(8001, {
  cors: {
    origin: '*',
    // path: '/ws',
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.emit('hello', 'hello world');
    setInterval(() => {
      this.server.emit('hello', 'hello world');
    }, 1000);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
