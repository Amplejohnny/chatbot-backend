import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import contentRoutes from "./src/routes/content.js";
import chatRoutes from "./src/routes/chat.js";

dotenv.config();
const app = express();

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/content", contentRoutes);
app.use("/chat", chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
