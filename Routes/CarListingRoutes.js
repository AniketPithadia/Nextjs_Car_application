import express from "express";
import {
  createCarListing,
  deleteCarListing,
  updateCarListing,
  getCarListing,
  getAllCarsListings,
} from "../Controllers/CarListingController.js";
import { verifyToken } from "../Middlewares/verifyToken.js";
const router = express.Router();
router.post("/create", verifyToken, createCarListing);
router.delete("/delete/:id", verifyToken, deleteCarListing);
router.post("/update/:id", verifyToken, updateCarListing);
router.get("/getListing/:id", getCarListing);
router.get("/getAllCars", getAllCarsListings);
export default router;
