import {Response,NextFunction } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import RequestWithUser from "../utils/requestwithUser";


const authorize = async(
    req: RequestWithUser,
    res :Response,
    next: NextFunction
)=>{
    try{
        const token = getTokenFromRequestHeader(req)
        const payload= jsonwebtoken.verify(token,JWT_SECRET)

        req.name  = (payload as JwtPayload).name;
        req.email  = (payload as JwtPayload).email;
        req.role  = (payload as JwtPayload).role;

        return next();
    }
    catch(error){
        return(next(error));
    }
}

const getTokenFromRequestHeader = (req: RequestWithUser)=>{
    const bearerToken = req.header("Authorization");
    const token = bearerToken ? bearerToken.replace("Bearer",""): "";
    return token;

}

export default authorize