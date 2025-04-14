export const verifyPermission = (req, res, next) => {
    try {
      if (req.user.role !== "admin" && req.user.role !== "owner") {
        return res
          .status(401)
          .json({ message: "غير مسموح لك باتخاذ هذا الاجراء" });
      }
      next(); // السماح بالاستمرار لو المستخدم Admin أو Owner
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  