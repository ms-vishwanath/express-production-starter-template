export interface configurationType {
  database: {
    postgres: {
      dbUrl: string | null | undefined;
    };
    mongodb: {
      dbUrl: string | null | undefined;
    };
  };
}
