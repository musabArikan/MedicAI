import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "No Authorized Login Again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// const authUser = async (req, res, next) => {
//   try {
//     const token = req.headers.token; // Token'ın header'dan alındığından emin olun
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized: No token provided",
//       });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id; // userId'yi req objesine ekle
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({
//       success: false,
//       message: "Unauthorized: Invalid token",
//     });
//   }
// };

export default authUser;
