import { bookingModel, IBooking } from "../models/Booking.model";

class BookingServices {
  async createBooking(bookingData: IBooking) {
    return await bookingModel.create(bookingData);
  }
  async getBookingsByUserId(userId: string) {
    return await bookingModel
      .find({
        userId: userId,
      })
      .populate("placeId");
  }

  async getBookingRequestsByUserId(userId: string) {
    return await bookingModel
      .find({ ownerId: userId, status: "pending" })
      .populate("placeId");
  }
  async updateBooking(id: string, status: string) {
    return await bookingModel.findOneAndUpdate({ _id: id }, { status: status });
  }
}
export const bookingServices = new BookingServices();
