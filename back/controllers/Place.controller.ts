import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../config/AsyncHandler";
import { IPlace } from "../models/Place.model";
import { placeServices } from "../services/Place.services";
import { authRequest } from "../middlewares/Auth";
import dotenv from "dotenv";
import {
  convertToDataURI,
  deleteFile,
  handleUpload,
  uploadedFile,
  // uploadFile,
} from "../utils/ImageHandler";
dotenv.config();
class PlaceController {
  static addPlace = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        title,
        description,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
        userId,
        perks,
        address,
        price,
        images,
      } = req.body;
      const data = {
        title,
        description,
        images,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
        userId,
        perks,
        price,
        address,
      } as IPlace;
      await placeServices.createPlace(data);

      return res.json({ message: "Place have been Added successfully" });
    }
  );
  static updatePlace = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const {
        title,
        description,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
        price,
        userId,
        perks,
        address,
        images,
      } = req.body;
      const data = {
        title,
        description,
        images,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
        userId,
        perks,
        price,
        address,
      } as IPlace;
      await placeServices.updatePlacesById(id, data);

      return res.json({ message: "Place have been updated successfully" });
    }
  );

  static getUserPlaces = asyncHandler(
    async (req: authRequest, res: Response, next: NextFunction) => {
      const places = await placeServices.getPlacesByUserId(req.userData.id);

      return res.json({ places: places });
    }
  );

  static getPlace = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const place = await placeServices.getPlacesById(id);
      return res.json(place);
    }
  );

  static uploadPlaceImage = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const files: any = { ...req.files };
      const dataURIs = await Promise.all(files["images"].map(convertToDataURI));
      const cloudinaryRes = await Promise.all(dataURIs.map(uploadedFile));
      return res.json({
        images: cloudinaryRes,
      });
    }
  );

  static deletePlaceImage = asyncHandler(
    async (req: authRequest, res: Response, next: NextFunction) => {
      const { path, id } = req.body;
      if (!id) {
        await deleteFile(path?.publicId);
        return res.json({
          message: "image deleted",
        });
      }
      const place = await placeServices.getPlacesById(id);
      if (req.userData.id === place?.userId.toString()) {
        await placeServices.deleteImageFromPlace(id, path?.publicId);
        await deleteFile(path?.publicId);
        return res.json({ message: "Image deleted" });
      }
      return res.json({
        message: "You do not have permission to delete this place",
      });
    }
  );

  static getPlaces = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        page = 1,
        limit = 8,
        search,
        maxPrice = "",
        minPrice = "",
      } = req.query;
      const places = await placeServices.getPlaces({
        page: page,
        limit: limit,
        search: search,
        minPrice,
        maxPrice,
      } as { page: number; limit: number; search: string; minPrice: string; maxPrice: string });
      return res.json({ places: places });
    }
  );
}
export default PlaceController;
