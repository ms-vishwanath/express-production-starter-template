import cors, { CorsOptions } from 'cors';

// Parse allowed origins from environment variable
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['*']; // Default to '*' if no environment variable is set

// Define CORS options
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error(`Origin ${origin} is not allowed by CORS`)); // Reject the origin
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  exposedHeaders: ['Authorization'], // Headers exposed to the client
  credentials: true, // Allow credentials (cookies, authorization headers)
};

// Middleware for CORS
const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
