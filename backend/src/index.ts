import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import myUserRoute from "./routes/MyUserRoutes";

const MONGODB_URL = process.env.MONGODB_URI as string;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/my/user", myUserRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
