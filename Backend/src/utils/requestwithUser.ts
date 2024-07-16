import { Role } from "./role.enum";
import { Request } from "express";

interface RequestWithUser extends Request{
    name:string;
    email: string;
    role : Role
}

export default RequestWithUser;