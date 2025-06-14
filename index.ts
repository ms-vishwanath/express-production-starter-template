import "reflect-metadata";
import express from "express";
import "@/helpers/env.helper";

import corsMiddleware from "@/helpers/cors.helper";
import indexRoutes from "@/routers/index.router";
import rateLimiterMiddleware from "@/helpers/rate-limiter.helper";
import { errorHandler } from "@/middlewares/error-handler.middleware";
import { logMiddlware } from "./helpers/logger.helper";
import { notFoundHandler } from "./middlewares/not-found.middleware";
import { MongoDBDatabase, PostgresSQLDatabase } from "./database/connection";


const app = express();
const port = process.env.PORT || 3000;

app.use(corsMiddleware);
app.use(rateLimiterMiddleware(1000,20))
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ extended: true, limit: "50mb" })); 
app.use(logMiddlware);    // USES THE LOGGER UTILITY TO LOG ALL THE REQUESTS
app.use("/api",indexRoutes); 
app.use(notFoundHandler) 
app.use(errorHandler) 


const startServer = async () => {
  try {
    await PostgresSQLDatabase.initialize();  // MAKES CONNECTION WITH THE POSTGRES DATABASE
    console.log("PostgreSQL connected successfully!");

    await MongoDBDatabase.initialize();    // MAKES CONNECTION WITH THE MONGODB
    console.log("MongoDB connected successfully!");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}!`);  // STARTS THE SERVER ONCE THE DB IS CONNECTED
    });
  } catch (error) {
    console.error("Failed to connect to the databases:", error);
  }
};

startServer();
