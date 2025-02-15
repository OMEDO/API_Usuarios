
import { Request, Response, NextFunction } from 'express';
import { checkUsuarioDTO } from '../interfaces/interfaces';
import { checkUsuario } from '../helpers/usuario.helper';


export const actualizaUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        let { nombre, apellido, telefono} = req.body

        nombre = nombre.toLowerCase();
        apellido = apellido.toLowerCase();

        const payload: checkUsuarioDTO = {
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
        }

        const checkData = await checkUsuario(payload);

        if (checkData) {
            res.status(400).json({
            ok: false,
            mensaje: checkData
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