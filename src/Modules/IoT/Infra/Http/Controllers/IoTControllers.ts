import { NextFunction, Request, Response } from 'express';
import { Socket } from 'socket.io-client';
import { container } from 'tsyringe';

import HttpError from '../../../../../Shared/Infra/Http/Errors/HttpError';
import IIoTRepository from '../../../Reposotories/IIoTRepository';
import CreateIoTService from '../../../Services/CreateIoTService';
import DeleteIoTService from '../../../Services/DeleteIoTService';
import findIoTByIdService from '../../../Services/FindIoTByIdService';
import UpdateIoTService from '../../../Services/UpdateIoTService';

class IoTController {
  private io: Socket;

  constructor(io: Socket) {
    this.io = io;
  }

  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { body } = request;

    const createLinkService = container.resolve(CreateIoTService);

    try {
      const result = await createLinkService.execute(body);

      return response.status(201).json({
        iot: {
          ...result.iot,
          details: JSON.parse(result.iot.details.toString()),
        },
      });
    } catch (error) {
      if (error instanceof HttpError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async findById(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { id } = request.params;

    const findIoT = container.resolve(findIoTByIdService);

    try {
      const { iot } = await findIoT.execute({
        id,
      });

      return response.status(200).json({
        iot: {
          ...iot,
          details: JSON.parse(iot.details.toString()),
        },
      });
    } catch (error) {
      if (error instanceof HttpError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async update(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { body, params } = request;

    const updateIoTService = container.resolve(UpdateIoTService);
    try {
      const iot = await updateIoTService.execute({
        id: params.id,
        ...body,
      });

      return response.status(200).json({
        iot: {
          ...iot,
          details: JSON.parse(iot.details.toString()),
        },
      });
    } catch (error) {
      if (error instanceof HttpError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { params } = request;

    const deleteGradeService = container.resolve(DeleteIoTService);

    try {
      await deleteGradeService.execute({
        id: params.id,
      });

      return response.status(204).json();
    } catch (error) {
      if (error instanceof HttpError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const ioTRepository = container.resolve<IIoTRepository>('IoTRepository');

    const ioTs = await ioTRepository.find({ page: 1, limit: 10 });

    return response.json(ioTs);
  }
}

export default IoTController;
