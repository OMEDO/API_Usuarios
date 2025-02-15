import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity("sesiones_usuario")
export class SesionUsuario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({ type: "datetime", default: () => "GETDATE()"})
    fecha_evento!: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.sesiones, { onDelete: "CASCADE" })
    usuario!: Usuario;
}
