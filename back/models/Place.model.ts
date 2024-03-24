import mongoose, { Model, Schema, Types } from "mongoose";
import { Document } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
interface IPlace extends Document {
  title: string;
  description: string;
  extraInfo: string;
  address: string;
  images: { url: string; public_id: string }[];
  perks: string[];
  checkIn: number;
  checkOut: number;
  maxGuest: number;
  price: number;
  userId: Types.ObjectId;
}

const placeSchema: Schema<IPlace> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    extraInfo: { type: String, required: true },
    address: { type: String, required: true },
    images: [{ type: Object, required: true }],
    perks: [{ type: String, required: true }],
    checkIn: { type: Number, required: true },
    checkOut: { type: Number, required: true },
    price: { type: Number, required: true },
    maxGuest: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const baseUrl = process.env.BASE_URL;

const placeModel: Model<IPlace> = mongoose.model("Place", placeSchema);

export { IPlace, placeModel };
