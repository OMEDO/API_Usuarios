import { jwtDataDTO } from "../interfaces/interfaces";
import jwt from 'jsonwebtoken';

export const generaJWT = (payload: jwtDataDTO): string => {
    const secret = process.env.JWT_SECRET || "SECRETOS3" 
    return jwt.sign(payload, secret,{expiresIn: '1h'})
}