export const verifyPermission = (req, res, next) => {
  const { admin } = req.user;
  try {
    if (admin === "user") {
      return res
        .status(401)
        .json({ message: "غير مسموح لك باتخاذ هذا الاجراء" });
    }
    next(); // السماح بالاستمرار لو المستخدم Admin أو Owner
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
