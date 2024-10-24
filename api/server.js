import express from "express";
import connectDB from "./db/db.js";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

connectDB();

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
