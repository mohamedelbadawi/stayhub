import { Router } from "express";
import PlaceController from "../controllers/Place.controller";
// import ImageHandler from "../utils/ImageHandler";
import multer from "multer";
import { isAuth } from "../middlewares/Auth";
import { checkSchema } from "express-validator";
import { addPlaceSchema } from "../validators/PlaceValidation";
import { validate } from "../middlewares/validator";
// const imageHandler = new ImageHandler("uploads/places/");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const placeRoutes = Router();

placeRoutes.post(
  "/place",
  checkSchema(addPlaceSchema),
  validate,
  isAuth,
  PlaceController.addPlace
);
placeRoutes.put(
  "/place/:id",
  checkSchema(addPlaceSchema),
  isAuth,
  PlaceController.updatePlace
);
placeRoutes.get("/place/user/:id", isAuth, PlaceController.getUserPlaces);
placeRoutes.get("/place/:id", PlaceController.getPlace);
placeRoutes.get("/places", PlaceController.getPlaces);

placeRoutes.post(
  "/place/images/upload/",
  isAuth,
  upload.fields([{ name: "images", maxCount: 10 }]),
  PlaceController.uploadPlaceImage
);
placeRoutes.post(
  "/place/images/delete/",
  isAuth,
  PlaceController.deletePlaceImage
);

export default placeRoutes;
