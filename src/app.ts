import express, { Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.route";
import { facilityRoutes } from "./app/modules/facility/facility.route";
import { bookingRoutes } from "./app/modules/bookings/booking.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
export const app = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", userRoutes);
app.use("/api", facilityRoutes);
app.use("/api", bookingRoutes);

// errors
app.use(globalErrorHandler);
app.use(notFound);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to sports fecility server");
});
