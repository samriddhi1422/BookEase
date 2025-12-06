import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  
  try {
    
    const atoken = req.headers.authorization;
    if(!atoken){
      res.json({
        succes:false,
        message:"No token provided , access deniee"
      })
    }
    const token = atoken.startsWith("Bearer ")
      ? atoken.split(" ")[1]
      : atoken;

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
     req.admin = token_decode;
     next();
  } catch (error) {
    console.log("auth error",error.message);
    res.json({
      succes:false,
      messgae : "Invalid or expired token"
    })
  }
};

export default authMiddleware;
