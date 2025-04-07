import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import contentRoutes from "./src/routes/content.js";
import chatRoutes from "./src/routes/chat.js";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://nimbou-cms.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.use("/content", contentRoutes);
app.use("/chat", chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
