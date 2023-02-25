import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { io } from 'socket.io-client';
import {
  OptionalAnyString,
  OptionalLimit,
  OptionalPage,
} from '../../../../../Shared/Infra/Http/Validators/Joi';

import IoTController from '../Controllers/IoTControllers';

class IoTRoutes {
  public register(): Router {
    const iotRoutes = Router();

    const iotController = new IoTController(io());

    iotRoutes.post(
      '/create',
      celebrate({
        [Segments.BODY]: Joi.object({
          details: Joi.array()
            .items(
              Joi.object({
                label: Joi.string().required(),
                value: Joi.string().required(),
              }),
            )
            .required(),
        }),
      }),
      (req, res, next) => iotController.create(req, res, next),
    );

    iotRoutes.get(
      '/get/:id',
      celebrate({
        [Segments.PARAMS]: {
          id: Joi.string().required(),
        },
      }),
      iotController.findById,
    );

    iotRoutes.put(
      '/update/:id',
      celebrate({
        [Segments.PARAMS]: {
          id: Joi.string().required(),
        },
        [Segments.BODY]: Joi.object({
          details: Joi.array()
            .items(
              Joi.object({
                id: Joi.string().required(),
                label: Joi.string().required(),
                value: Joi.string().required(),
              }),
            )
            .required(),
        }),
      }),
      iotController.update,
    );

    iotRoutes.delete(
      '/delete/:id',
      celebrate({
        [Segments.PARAMS]: {
          id: Joi.string().required(),
        },
      }),
      iotController.delete,
    );

    iotRoutes.get(
      '/all',
      celebrate({
        [Segments.QUERY]: {
          page: OptionalPage,
          limit: OptionalLimit,
          orderBy: OptionalAnyString,
        },
      }),
      iotController.index,
    );

    return iotRoutes;
  }
}

export default IoTRoutes;
