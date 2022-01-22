import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/auth.config.js";

//check if user is logged in
// click like btn -> auth middleware[are you logged in?](NEXT) -> like controller... operations
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isGoogleToken = token.length > 500;
    let decodedData;

    if(token && !isGoogleToken){
        decodedData = jwt.verify(token, JWT_SECRET);
        req.userId = decodedData?.id;
    }else{
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;
    }

    next(); //pass action
  } catch (err) {
    console.error(err);
  }
};


export default auth;