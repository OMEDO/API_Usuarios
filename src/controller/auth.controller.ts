
import { json, Request, Response } from 'express';


export const addUser = async(req: Request, res: Response) => {
  try {

    const { nombre, apellido, telefono} = req.body
    res.status(201).json({
      ok:true,
      mensaje: `Servicio para agregar un usuario, usuario registrado ${nombre}  ${apellido} ${telefono}`
    })
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Algo salio mal, contacte al admininstrador"
    })
  }
}