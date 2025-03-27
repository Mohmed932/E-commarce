// Import necessary modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { dbConnection } from "./config/db.js";
import { routes } from "./routes/route.js";

// Initialize dotenv to load environment variables
config();

// Fetch environment variables
const port = process.env.PORT;
const domain = process.env.DOMAIN;
const url = process.env.MONGODB_URL;

// Check if all required environment variables are provided
if (!port || !domain || !url) {
  console.error("Missing environment variables.");
  process.exit(1);
}

// Create an Express server
const server = express();

// Middleware setup
server.use(express.json());
server.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: domain,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

server.use(cors(corsOptions));

// Set up routes
routes(server);

// Default route for the server
server.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server and connect to the database
server.listen(port, () => {
  dbConnection(url);
  console.log(`Server is running on ${domain}:${port}`);
});
