import { Router } from "express";
import BookingController from "../controllers/Booking.controller";
import { isAuth } from "../middlewares/Auth";
import { checkSchema } from "express-validator";
import {
  addBookingSchema,
  updateBookingSchema,
} from "../validators/Booking.Validation";
import { validate } from "../middlewares/validator";

const bookingRoutes = Router();

bookingRoutes.post(
  "/booking",
  isAuth,
  checkSchema(addBookingSchema),
  validate,
  BookingController.addBooking
);
bookingRoutes.put(
  "/booking/:id",
  isAuth,
  checkSchema(updateBookingSchema),
  validate,
  BookingController.updateBookingRequest
);
bookingRoutes.get("/booking/user/", isAuth, BookingController.getUserBookings);
bookingRoutes.get(
  "/booking/user/requests",
  isAuth,
  BookingController.getUserBookingRequests
);
export default bookingRoutes;
