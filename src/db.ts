import { DataSource } from "typeorm";
import { Usuario } from "./entities/usuario.entity";
import { SesionUsuario } from "./entities/sesiones_usuario.entity";

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "host.docker.internal",
    port: 1433,
    username: "sa",
    password: "Pru3b@T3cn1c@N0d3",
    database: "Usuarios",
    synchronize: true, 
    logging: false,
    entities: [Usuario, SesionUsuario],
    options: {
      encrypt: true, 
      trustServerCertificate: true
    }
  })