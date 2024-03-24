import mongoose, { Date, Document, Model, Schema, Types } from "mongoose";

enum STATUS {
  "pending",
  "canceled",
  "approved",
}
interface IBooking extends Document {
  placeId: Types.ObjectId;
  userId: Types.ObjectId;
  ownerId: Types.ObjectId;
  fullName: string;
  checkOut: Date;
  checkIn: Date;
  phone: string;
  price: number;
  guests: number;
  status: string;
}

const bookingSchema: Schema<IBooking> = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    guests: { type: Number, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: STATUS,
      required: true,
      default: "pending",
    },
    placeId: { type: Schema.Types.ObjectId, ref: "Place", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
const bookingModel: Model<IBooking> = mongoose.model("Booking", bookingSchema);

export { IBooking, bookingModel };
