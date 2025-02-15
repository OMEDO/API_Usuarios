import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { Usuario } from '../entities/usuario.entity';
import { checkUsuario } from '../helpers/usuario.helper';
import { checkUsuarioDTO } from '../interfaces/interfaces';

export const validaUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

         let { nombre, apellido, telefono, correo } = req.body
       

        const payload: checkUsuarioDTO = {
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            correo: correo
        }

        const checkData = await checkUsuario(payload);

        if (checkData) {
              res.status(400).json({
              ok: false,
              mensaje: checkData
            });
            return
        }

        const usuario = Usuario.create(req.body);

        const errors = await validate(usuario)

        if(errors.length > 0){
            const errorMessages = errors.map(error => {
                return Object.values(error.constraints || {}).join(', ');
              });
        
               res.status(400).json({
                ok: false,
                mensaje: "Datos inválidos",
                errores: errorMessages 
              });
              return
        }

        next();
        
    } catch (error) {
         res.status(500).json({
            ok: false,
            mensaje: "Algo salió mal, contacte al administrador",
            error
          });
        return
    }
}