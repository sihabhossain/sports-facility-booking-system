import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.route";
import { facilityRoutes } from "./app/modules/facility/facility.route";
import { bookingRoutes } from "./app/modules/bookings/booking.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

// application
export const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({ origin: "*" }));

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to sports facility server");
});

// API routes
app.use("/api/auth", userRoutes);
app.use("/api", facilityRoutes);
app.use("/api", bookingRoutes);

// Global error handler
app.use(globalErrorHandler);

// 404 Not Found handler
app.use(notFound);
