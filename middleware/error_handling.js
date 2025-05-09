export const errorhandeler = (err, req, res, next) => {
  // Determine if the error is a validation error or a database error, etc.
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "بيانات المدخلات غير صالحة.",
      errors: err.errors, // This will include the validation errors
    });
  }

  // Check for other common error types
  if (err.name === "MongoError") {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ في قاعدة البيانات.",
    });
  }

  // Catching any other type of error (e.g., general server errors)
  return res.status(500).json({
    success: false,
    message: "حدث خطأ ما، يرجى المحاولة لاحقًا.",
    // Optionally include error details in development mode
    ...(process.env.NODE_ENV === "development" && {
      errorDetails: err.message,
    }),
  });
};
