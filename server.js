// Import necessary modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { dbConnection } from "./config/db.js";
import { routes } from "./routes/route.js";
import { apiLimiter } from "./middleware/rateLimit.js";
import csurf from "csurf";
import compression from "compression";
import { errorhandeler } from "./middleware/error_handling.js";

// Load environment variables
config();

// Fetch environment variables
const port = process.env.PORT;
const domain = process.env.DOMAIN;
const url = process.env.MONGODB_URL;
const csrfProtection = csurf({ cookie: true });

// Check if all required environment variables are provided
if (!port || !domain || !url) {
  console.error("Missing environment variables.");
  process.exit(1);
}

// Create an Express server
const server = express();

// Middleware setup
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());
server.use(apiLimiter);
server.get(compression());

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
server.use(cors(corsOptions));

// Apply CSRF Protection to non-GET routes only
server.use((req, res, next) => {
  if (req.method !== "GET") {
    csrfProtection(req, res, next);
  } else {
    next();
  }
});

// Default route for the server
server.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Set up routes
routes(server);

// Error handling middleware
server.use(errorhandeler);

// Handle undefined routes
server.use("*", (req, res) => {
  res.status(404).json({ message: "لا يوجد api لهذا العنوان" });
});

// Start the server and connect to the database
const startServer = async () => {
  try {
    await dbConnection(url);
    server.listen(port, () => {
      console.log(`✅ Server is running on ${domain}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to database:", err);
    process.exit(1);
  }
};

startServer();
