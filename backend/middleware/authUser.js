import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  
  try {
    //get the header
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
    console.log("DECODED TOKEN =",token_decode);

    req.user = token_decode._id;
        return next();

  } catch (error) {
    console.log("auth error",error.message);
    res.json({
      succes:false,
      messgae : "Invalid or expired token"
    })
  }
};


