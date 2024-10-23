import express from "express";
import connectDB from "./db/db.js";

const app = express();
const port = process.env.PORT || 3000;

connectDB();
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
