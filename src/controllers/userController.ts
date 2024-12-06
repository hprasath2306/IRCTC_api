import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSeatAvailability = async (req: Request, res: Response) => {
  const { source, destination } = req.query;
  try {
    const trains = await prisma.train.findMany({
      where: { source: String(source), destination: String(destination) },
      include: { bookings: true },
    });

    const availability = trains.map((train: any) => ({
      id: train.id,
      name: train.name,
      availableSeats: train.totalSeats - train.bookings.length,
    }));

    res.json(availability);
  } catch (error) {
    res.status(500).json({ message: "Error fetching availability", error });
  }
};

export const bookSeat = async (req: Request, res: Response) => {
  const { trainId } = req.body;
  const userId = (req as any).user.id;

  try {
    const train = await prisma.train.findUnique({
      where: { id: trainId },
      include: { bookings: true },
    });

    if (!train) {
      res.status(404).json({ message: "Train not found" });
      return;
    }

    const availableSeats = train.totalSeats - train.bookings.length;
    if (availableSeats <= 0) {
      res.status(400).json({ message: "No seats available" });
      return;
    }

    const booking = await prisma.booking.create({
      data: { userId, trainId, seatNo: train.bookings.length + 1 },
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error booking seat", error });
  }
};

export const getBookingDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: Number(id) },
      include: { Train: true, User: true },
    });

    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    if (booking.userId !== userId) {
      res.status(403).json({ message: 'Access denied to this booking' });
      return;
    }

    res.json({
      bookingId: booking.id,
      trainName: booking.Train.name,
      seatNo: booking.seatNo,
      source: booking.Train.source,
      destination: booking.Train.destination,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking details', error });
  }
};

