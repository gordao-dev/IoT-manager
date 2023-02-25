import 'reflect-metadata';
import express from 'express';

import { errors as CelebrateErrors } from 'celebrate';
import { configure, getLogger } from 'log4js';
import { PrismaClient } from '@prisma/client';
import { Server } from 'socket.io';

import Injections from '../Injections';
import ErrorHandlerMiddleware from './Middlewares/ErrorsHandlerMIddleware';
import http from 'http';
import IoTRoutes from '../../../Modules/IoT/Infra/Http/Routes/IoT.routes';

configure({
  appenders: {
    stdout: {
      type: 'stdout',
    },
  },
  categories: {
    default: {
      appenders: ['stdout'],
      level: 'debug',
    },
  },
});

const prisma = new PrismaClient();

const logger = getLogger('server');
const iotRoutes = new IoTRoutes();

const main = async () => {
  const app = express();

  const injections = new Injections();
  injections.register();

  const httpServer = http.createServer(app);

  app.use(express.json());
  app.use('/iot', iotRoutes.register());

  app.use(CelebrateErrors());
  app.use(ErrorHandlerMiddleware);

  const port = process.env.PORT || 3000;

  httpServer.listen(port, () => {
    logger.info(`Server running in http://localhost:${port}`);
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
