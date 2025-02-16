
import { json, Request, Response } from 'express';
import { Usuario } from '../entities/usuario.entity';
import { SesionUsuario } from '../entities/sesiones_usuario.entity';
import { jwtDataDTO } from '../interfaces/interfaces';
import { generaJWT } from '../helpers/jwtService';


export const addUser = async(req: Request, res: Response) => {
  try {
    const { nombre, apellido, telefono, correo, password} = req.body
    const usuario = Usuario.create({
      nombre,
      apellido,
      telefono,
      correo,
      password
    })

    usuario.hashPassword()

    const usuarioRegistrado =await Usuario.save(usuario)

    const sesion = SesionUsuario.create({
      usuario: usuarioRegistrado
    })

    await SesionUsuario.save(sesion)

    res.status(201).json({
      ok:true,
      mensaje: `Usuario creado correctamente`
    })
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Algo salio mal, contacte al administrador"
    })
  }
}

export const login = async(req: Request, res: Response) => {

  try {
    const { correo, password} = req.body;
    if(!(correo && password)){
      res.status(400).json({
        ok:false,
        mensaje: `Usuario y contraseña son requeridos`
      })

      return
    }
    
    const usuario = await Usuario.findOne({
      where: {correo}
    })

    if (usuario) {

      if(!usuario.checkPassword(password)) {
        res.status(400).json({
          ok:false,
          mensaje: `Credenciales incorrectas`
        })
        return
      }

      const payload: jwtDataDTO = {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
      }

      const token = generaJWT(payload)

      usuario.token = token;
      await usuario.save()

      const sesion = SesionUsuario.create({
        usuario: usuario
      })
  
      await SesionUsuario.save(sesion)

       res.status(200).json({
        ok: true,
        mensaje: 'Inicio de sesión éxitoso',
        usuario: {
          ...usuario, 
          password: undefined, 
        },
      });

    } else {
      res.status(400).json({
        ok:false,
        mensaje: `No se encontró un usuario las credenciales ingresadas`
      })
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Algo salio mal, contacte al administrador", error
    })
  }
}

export const usuarioById = async(req: Request, res: Response) => {
  try {
    const {id} = req.query;

    if(!id || isNaN(Number(id))){
      res.status(400).json({
        ok:false,
        mensaje: `El ID del usuario es requerido`
      })
      return
    }
  
    const usuario = await Usuario.findOne({
      where: {id: Number(id)},
      relations: ['sesiones']
    })

    if(usuario) {
      res.status(201).json({
        ok:true,
        mensaje: `Usuario encontrado`,
        usuario: {
          ...usuario,
          password: undefined
        }
      })
    } else {
      res.status(404).json({
        ok: false,
        mensaje: 'No se encontro un usuario con el ID especificado',
      });
    }
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Algo salio mal, contacte al administrador"
    })
  }
}

export const updateAfiliado = async(req: Request, res: Response) => {
  const { id, nombre, apellido, telefono} = req.body

  try {

    const usuario = await Usuario.findOne({
      where: {id: Number(id)}
    })

    if(usuario) {
      const actualiza = Usuario.update(
        {id: usuario.id},
        {
          nombre,
          apellido,
          telefono,
          fecha_actualizacion: new Date()
        })

      res.status(201).json({
        ok:true,
        mensaje: `Usuario actualizado correctamente`
      })
    } else {
      res.status(404).json({
        ok: false,
        mensaje: 'No se encontró un usuario con el ID especificado',
      });
    }
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Algo salio mal, contacte al administrador"
    })
  }
}

export const eliminaUsuario = async(req: Request, res: Response) => {
  try {

    const {id} = req.query;

    if(!id || isNaN(Number(id))){
      res.status(400).json({
        ok:false,
        mensaje: `El ID del usuario es requerido`
      })
      return;
    }

    const usuario = await Usuario.findOne({
      where: {id: Number(id)},
      relations: ['sesiones']
    })

    

    if(usuario){
      await Usuario.delete({ id: Number(id) });

      res.status(201).json({
        ok:true,
        mensaje: `El usuario y sus sesiones se eliminaron correctamente`
      })
    } else {
      res.status(404).json({
        ok: false,
        mensaje: 'No se encontro un usuario con el ID especificado',
      });
      return
    }
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Algo salio mal, contacte al administrador"
    })
  }
}