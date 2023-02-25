import { IoT, PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

import ICreateIoT from '../../../@Types/ICreateIoT';
import IFilterIoT from '../../../@Types/IFilterIoT';
import IPaginatedIoTs from '../../../@Types/IPaginatedIoTs';
import IUpdateIoT from '../../../@Types/IUpdateIoT';
import IIoTRepository from '../../../Reposotories/IIoTRepository';

class IoTRepository implements IIoTRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public find = async (filter: IFilterIoT): Promise<IPaginatedIoTs> => {
    const { page, limit } = filter;

    const [iots, total] = await Promise.all([
      this.prisma.ioT.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.ioT.count({}),
    ]);

    const formattedIoTs = iots.map(i => ({
      ...i,
      details: JSON.parse(i.details.toString()),
    }));

    return { iots: formattedIoTs, total };
  };

  public create = async (data: ICreateIoT): Promise<IoT> => {
    const IoT = await this.prisma.ioT.create({
      data: {
        ...data,
        details: JSON.stringify(data.details),
      },
    });
    return IoT;
  };

  public async findById(id: string): Promise<IoT | null> {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const iot = await this.prisma.ioT.findUnique({
      where: {
        id,
      },
    });

    return iot;
  }

  public update = async (data: IUpdateIoT): Promise<IoT> => {
    const { id } = data;
    const ioT = await this.prisma.ioT.findUnique({
      where: {
        id,
      },
    });

    const details = JSON.parse(ioT.details.toString());

    const updatedDetails = details.map(detail => {
      const existingDetail = data.details.find(d => d.id === detail.id);

      if (existingDetail) {
        const newDetail = Object.assign(detail, existingDetail);
        return newDetail;
      }

      return detail;
    });

    const newIoT = await this.prisma.ioT.update({
      where: { id },
      data: {
        details: JSON.stringify(updatedDetails),
      },
    });

    return newIoT;
  };

  public async save(iot: IoT): Promise<IoT> {
    return await this.prisma.ioT.update({
      where: { id: iot.id },
      data: { ...iot },
    });
  }

  public delete = async (id: string): Promise<void> => {
    await this.prisma.ioT.delete({
      where: { id },
    });
  };
}

export default IoTRepository;
