import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addTrain = async (req: Request, res: Response) => {
  const { name, source, destination, totalSeats } = req.body;
  try {
    const train = await prisma.train.create({
      data: { name, source, destination, totalSeats },
    });
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ message: 'Error creating train', error });
  }
};