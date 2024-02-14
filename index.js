// Description: This file is the entry point of the server. It connects to the database and starts the server.
// CODE WRITTEN BY ANIKET PITHADIA
import express from "express";
import connectToMongoDB from "./database.js";
import userRoutes from "./Routes/UserRoutes.js";
import authRoutes from "./Routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import carListingRoutes from "./Routes/CarListingRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectToMongoDB();

  console.log(`Server started at ${port}`);
});
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/listing", carListingRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
