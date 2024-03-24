import morgan from "morgan";
import express, { Request, Response } from "express";
import { httpStream, errorStream } from "./config/logger";
import { initRedis } from "./config/redis";
import path from "path";
import cookieParser from "cookie-parser";
import ErrorHandler from "./config/ErrorHandler";
import { dbConnection } from "./config/db";
import authRoutes from "./routes/Auth.route";
import cors from "cors";
import placeRoutes from "./routes/Place.route";
import bookingRoutes from "./routes/Booking.route";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.CLOUD_SECRET_KEY as string);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.CLOUD_API_KEY as string,
  api_secret: process.env.CLOUD_SECRET_KEY as string,
});
const app = express();
app.use(cookieParser());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRedis();
app.use("/uploads/", express.static(path.join(__dirname, "uploads")));

// routes
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Success" });
});

app.use("/api", authRoutes);
app.use("/api", placeRoutes);
app.use("/api", bookingRoutes);

app.use(
  morgan("combined", {
    stream: httpStream,
    skip: (req: Request, res: Response) => res.statusCode >= 400,
  })
);
app.use(
  morgan("combined", {
    stream: errorStream,
    skip: (req: Request, res: Response) => res.statusCode < 400,
  })
);

app.use(ErrorHandler);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  dbConnection();
  console.log(`App is running on ${port}`);
});
