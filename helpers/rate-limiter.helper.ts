import rateLimit from "express-rate-limit";

/**
 * Middleware to limit API requests.
 * 
 * @param limit - Maximum number of requests allowed within the time window.
 * @param minutes - Time window for request count (in minutes).
 * @param message - Custom error message for when the rate limit is exceeded.
 * 
 * @returns A middleware function for rate limiting.
 */
const rateLimiterMiddleware = (limit: number, minutes: number, message: string = "Too many requests, please try again later.") => {
  return rateLimit({
    windowMs: minutes * 60 * 1000, // Convert minutes to milliseconds
    max: limit, // Maximum number of requests per time window
    message: { error: message }, // Response message when the limit is exceeded
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
  });
};

export default rateLimiterMiddleware;
