import express, { Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.route";
export const app = express();

// parsers
app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
