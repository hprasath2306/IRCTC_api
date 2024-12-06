import express from "express";
import { authenticateJWT } from "../middlewares/auth";
import { getSeatAvailability, bookSeat, getBookingDetails } from "../controllers/userController";

export const userRoutes = express.Router();

userRoutes.get("/availability", authenticateJWT, getSeatAvailability);
userRoutes.post("/book", authenticateJWT, bookSeat);
userRoutes.get('/bookings/:id', authenticateJWT, getBookingDetails);
