export interface jwtDataDTO {
    id: number,
    nombre: string
    correo: string
}

export interface checkUsuarioDTO{
    nombre: string
    apellido: string
    telefono: string
    correo?: string
}