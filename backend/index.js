import express from "express";
import connectDB from "./db/connection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const PORT = process.env.PORT || 8080;
const app = express();

const __dirname = path.resolve(); // corrected spelling

// ✅ CORS Configuration for both local dev and production
app.use(cors({
  origin: 'https://job-portal-9hg2.onrender.com',
  credentials: true
}));

// ✅ Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true })); // fixed import usage

// ✅ API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ✅ Serve frontend in production
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
