import Configure from './config/configuration';
import Server from './Server';

const server = new Server(Configure);
server.bootstrap();
server.run();
