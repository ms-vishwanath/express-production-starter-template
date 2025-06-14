export const successResponse = (
    res: any,
    data?: any,
    statusCode: number = 200
  ) => {
    return res.status(statusCode).json({
      status: "success",
      data:{},
    });
  };
  
  export const errorResponse = (
    res: any,
    message: string = "",
    statusCode: number = 500,
    data?: any
  ) => {
    const response = {
      status: "error",
      message,
      ...(data && { data }),
    };
    return res.status(statusCode).json(response);
  };
  
  export const handleDuplicateError = (error: any, res?: any) => {
    // MongoDB duplicate key error (code 11000)
    if (error.code === 11000 && error.keyValue) {
      const key = Object.keys(error.keyValue)[0];
      const value = error.keyValue[key];
      return errorResponse(
        res,
        `Duplicate entry detected for ${key}: ${value}`,
        409
      );
    }
  
    // PostgreSQL unique constraint violation (code 23505)
    if (error.code === "23505" && error.detail) {
      const detail = error.detail;
      const match = detail.match(/Key \(([^)]+)\)=\(([^)]+)\)/);
      if (match) {
        const [, key, value] = match;
        return errorResponse(
          res,
          `Duplicate entry detected for ${key}: ${value}`,
          409
        );
      }
    }
  
    // Default error response
    return errorResponse(res, "An unexpected error occurred", 500);
  };
  