import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import bookRoutes from "./Routers/BookRouter.js";
import writerRoutes from "./Routers/WriterRouter.js";
import bookRequestRoutes from "./Routers/BookRequestRoute.js";
import adminAuthRoutes from "./Routers/AdminRouter.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// MongoDB connect
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/zed", bookRoutes);
app.use("/zed", writerRoutes);
app.use("/zed", bookRequestRoutes);
app.use("/zed/admin", adminAuthRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend of zedStore is running");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});


