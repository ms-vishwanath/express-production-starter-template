import { Logger, QueryRunner } from "typeorm";
import { logger } from "@/helpers/logger.helper";

class CustomTypeORMLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    logger.info(
      `Query: ${query} ${parameters ? JSON.stringify(parameters) : ""}`
    );
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) {
    logger.error(
      `Query Error: ${error} Query: ${query} ${
        parameters ? JSON.stringify(parameters) : ""
      }`
    );
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) {
    logger.warn(
      `Slow Query (${time}ms): ${query} ${
        parameters ? JSON.stringify(parameters) : ""
      }`
    );
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    logger.info(`Schema Build: ${message}`);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    logger.info(`Migration: ${message}`);
  }

  log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner) {
    switch (level) {
      case "log":
        logger.debug(message);
        break;
      case "info":
        logger.info(message);
        break;
      case "warn":
        logger.warn(message);
        break;
    }
  }
}

export default CustomTypeORMLogger;
