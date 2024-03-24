import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../config/AsyncHandler";
import { bookingServices } from "../services/Booking.services";
import { IBooking } from "../models/Booking.model";
import { authRequest } from "../middlewares/Auth";
import { placeServices } from "../services/Place.services";
import ApiError from "../config/ApiError";
class BookingController {
  static addBooking = asyncHandler(
    async (req: authRequest, res: Response, next: NextFunction) => {
      const { fullName, checkIn, checkOut, price, place, guests } = req.body;
      const placeId = place;
      const userId = req.userData.id;
      // check if there is a place or not
      const isPlaceExists = await placeServices.getPlacesById(placeId);
      if (!isPlaceExists) {
        return next(new ApiError("No place found", 404));
      }

      if (isPlaceExists.userId.toString() === userId.toString()) {
        return next(new ApiError("you can't book your place", 400));
      }
      const ownerId = isPlaceExists.userId;
      const booking = await bookingServices.createBooking({
        fullName,
        checkIn,
        checkOut,
        price,
        placeId,
        guests,
        userId,
        ownerId,
      } as IBooking);
      return res.json({ message: "Booking created successfully" });
    }
  );

  static getUserBookings = asyncHandler(
    async (req: authRequest, res: Response, next: NextFunction) => {
      const places = await bookingServices.getBookingsByUserId(req.userData.id);
      return res.json({
        places: places,
      });
    }
  );
  static getUserBookingRequests = asyncHandler(
    async (req: authRequest, res: Response, next: NextFunction) => {
      const userId = req.userData.id;
      const bookingData = await bookingServices.getBookingRequestsByUserId(
        userId
      );
      return res.json({ requests: bookingData });
    }
  );

  static updateBookingRequest = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { status } = req.body;
      const { id } = req.params;
      await bookingServices.updateBooking(id, status);
      return res.json({ message: "Done!" });
    }
  );
}
export default BookingController;
