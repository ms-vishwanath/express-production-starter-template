import morgan from 'morgan';
import winston from 'winston';
import { Request, Response, NextFunction } from 'express';

// Winston Logger Configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'app-service' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), // Console logging
    new winston.transports.File({ filename: 'logs/combined.log' }),      // Log to file
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

// Morgan stream for redirecting HTTP request logs to Winston
const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// Unified Middleware
const logMiddlware = (req: Request, res: Response, next: NextFunction) => {
  // Morgan Middleware for HTTP Logging
  const morganMiddleware = morgan('combined', { stream });

  // Attach Morgan to the request pipeline
  morganMiddleware(req, res, (err) => {
    if (err) return next(err);

    // Additional Logging via Winston for non-HTTP events
    logger.info(`[Request] ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);

    // Response Logging
    res.on('finish', () => {
      logger.info(`[Response] ${req.method} ${req.url} - Status: ${res.statusCode}`);
    });

    next();
  });
};

export { logger, logMiddlware };
