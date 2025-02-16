import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const verificarToken = (req: Request, res: Response, next: NextFunction)=> {
    const JWT_SECRET = process.env.JWT_SECRET || 'P@iabr@S3Cr3t4'

    const token = req.header('Authorization')  as string;;

    if (!token) {
         res.status(401).json({ message: 'Token no proporcionado' });
         return
    }

    try {
        const tokenSinBearer = token.replace('Bearer ', '');
        const jwtPayload = jwt.verify(tokenSinBearer, JWT_SECRET) as any;
        res.locals.jwtPayload = jwtPayload;
        next();
        
    } catch (e) {
        res.status(401).json({ message: 'No autorizado' });
        return
    }


};