import { Usuario } from "../entities/usuario.entity";
import { checkUsuarioDTO } from "../interfaces/interfaces";


export const checkUsuario = async (payload:checkUsuarioDTO): Promise<string | null> => {
    let { nombre, apellido, telefono, correo } = payload
        
    nombre = nombre.toLowerCase();
    apellido = apellido.toLowerCase();
    correo = correo?.toLowerCase();

    const usuarioExistente = await Usuario.findOne({
        where: [
            {nombre},
            {apellido},
            {telefono},
            {correo}
        ]
    });
    
    if (usuarioExistente) {
      
        let mensajeError = '';
            if (usuarioExistente.nombre.toLowerCase() === nombre) {
                mensajeError = `Ya existe un usuario con el nombre ${nombre}.`;
            } else if (usuarioExistente.apellido.toLowerCase() === apellido) {
                mensajeError = `Ya existe un usuario con el apellido ${apellido}.`;
            } else if (usuarioExistente.telefono === telefono) {
                mensajeError = `Ya existe un usuario con el teléfono ${telefono}.`;
            } else if (usuarioExistente.correo.toLowerCase() === correo) {
                mensajeError = `Ya existe un usuario con el correo ${correo}.`;
            }
            return mensajeError;
      }

      return null

}