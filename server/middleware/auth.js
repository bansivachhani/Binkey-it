import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
  try {
    let token = req.cookies.accessToken;

    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Provide token",
        error: true,
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    req.userId = decode.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message || "Authentication failed",
      error: true,
      success: false,
    });
  }
};

export default auth;
