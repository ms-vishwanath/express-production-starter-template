import { configurationType } from "@/types/configuration.type";

// Define the expected configuration structure
const REQUIRED_CONFIG = {
  database: {
    postgres: [
      "POSTGRES_SQL_CONNECTION_STRING",
    ],
    mongodb: [
      "MONGO_DB_CONNECTION_STRING",
    ],
  },
};


// Validate configuration recursively
function validateConfig(
  configObject: any,
  envVars: any,
  parentKey = ""
): string[] {
  const missingConfigs: string[] = [];

  for (const key in configObject) {
    const fullPath = parentKey ? `${parentKey}.${key}` : key;

    if (Array.isArray(configObject[key])) {
      // Check environment variables listed in the array
      configObject[key].forEach((envVar) => {
        if (!envVars[envVar]) {
          missingConfigs.push(envVar);
        }
      });
    } else {
      // Recurse into nested objects
      missingConfigs.push(
        ...validateConfig(configObject[key], envVars, fullPath)
      );
    }
  }

  return missingConfigs;
}

// Run validation before starting the server
const missingVariables = validateConfig(REQUIRED_CONFIG, process.env);

if (missingVariables.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVariables.join(", ")}`
  );
}

export const config: configurationType = {
  database: {
    postgres: {
      dbUrl: process?.env?.POSTGRES_SQL_CONNECTION_STRING,
    },
    mongodb: {
      dbUrl: process?.env?.MONGO_DB_CONNECTION_STRING,
    },
  },
};
