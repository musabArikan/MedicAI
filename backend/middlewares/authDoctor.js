import jwt from "jsonwebtoken";

// const authDoctor = async (req, res, next) => {
//   try {
//     const { dtoken } = req.headers;
//     if (!dtoken) {
//       return res.json({
//         success: false,
//         message: "No Authorized Login Again",
//       });
//     }
//     const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
//     req.docId = token_decode.id;

//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
const authDoctor = async (req, res, next) => {
  try {
    const token = req.headers.dtoken;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.docId = decoded.id; // Doktor ID'sini req objesine ekle
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
export default authDoctor;
