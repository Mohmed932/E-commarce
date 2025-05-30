import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { dbConnection } from "./config/db.js";
import { routes } from "./routes/route.js";
// import { apiLimiter } from "./middleware/rateLimit.js";
import compression from "compression";
// import { errorhandeler } from "./middleware/error_handling.js";

config();

const port = process.env.PORT;
const domain = process.env.DOMAIN;
const url = process.env.MONGODB_URL;

if (!port || !domain || !url) {
  console.error("Missing environment variables.");
  process.exit(1);
}

const server = express();

// Middleware setup
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
// server.use(apiLimiter);
server.use(compression()); // صححت هنا


const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};


server.use(cors(corsOptions));


server.get("/", (req, res) => {
  res.send("Hello, World!");
});

routes(server);

// server.use(errorhandeler);

server.use("*", (req, res) => {
  res.status(404).json({ message: "لا يوجد api لهذا العنوان" });
});

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
