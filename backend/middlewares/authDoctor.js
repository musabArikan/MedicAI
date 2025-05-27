import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const token = req.headers.dtoken;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.docId = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
export default authDoctor;
