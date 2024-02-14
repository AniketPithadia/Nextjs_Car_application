// Description: All the functions related to CarListing will be here.

import CarListing from "../Models/CarListing.js";

import { errorHandler } from "../utils/error.js";

// Define Zod schema for car listing
const carListingSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(10).max(500),
  price: z.number().min(0),
  location: z.string().min(3).max(100),
  image: z.string().url(),
  owner: z.string().uuid(),
});
// Validate function for car listing
const validateCarListing = (data) => {
  const result = carListingSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
};
export const createCarListing = async (req, res, next) => {
  try {
    const carData = validateCarListing(req.body);
    const carlisting = await CarListing.create(carData);
    return res.status(201).json(carlisting);
  } catch (error) {
    next(error);
  }
};
export const deleteCarListing = async (req, res, next) => {
  const carlisting = await CarListing.findById(req.params.id);
  if (req.user.id !== carlisting.userRef)
    return next(errorHandler(403, "No access to this account"));
  try {
    await CarListing.findByIdAndDelete(req.params.id);
    return res.status(200).json("CarListing has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateCarListing = async (req, res, next) => {
  const carData = validateCarListing(req.body);
  const carlisting = await CarListing.findById(req.params.id);
  if (!carlisting) return next(errorHandler(404, "CarListing not found"));
  if (req.user.id !== carlisting.userRef)
    return next(errorHandler(403, "No access to this account"));
  try {
    const updatedCarListing = await CarListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedCarListing);
  } catch (error) {
    next(error);
  }
};

export const getCarListing = async (req, res, next) => {
  try {
    const carlisting = await CarListing.findById(req.params.id);
    if (!carlisting) return next(errorHandler(404, "CarListing not found"));
    return res.status(200).json(carlisting);
  } catch (error) {
    next(error);
  }
};

export const getAllCarsListings = async (req, res, next) => {
  try {
    const carlistings = await CarListing.find();
    return res.status(200).json(carlistings);
  } catch (error) {
    next(error);
  }
};
